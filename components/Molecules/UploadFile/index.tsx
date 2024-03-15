import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { storage } from "@/app/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

import Button from "@/components/Atoms/Button";
import { CancelButton } from "@/components/Atoms/CancelButton";

import styled from "@emotion/styled";
import { ModalWrap, BackgroundModal, Buttons } from "@/styles/Modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { GoFile } from "react-icons/go";
import { Hr } from "@/styles/htmlStyles";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

import type { TokenType } from "@/types/auth";

import { uploadFiles } from "@/utils/uploadFiles";
import { formatFileSize } from "@/utils/formatFileSize";

const UploadModalWrap = styled(ModalWrap)`
  width: 500px;
  height: 400px;

  .title {
    color: var(--font-color-1);
    font-size: var(--font-size-s);
    margin-bottom: var(--gap-02);
  }
  .explanation {
    color: var(--gray-08);
    font-size: var(--font-size-xxs);
    margin-bottom: var(--gap);
  }
`;

export const FileSelectBox = styled.div`
  display: flex;
  height: 40px;
  gap: var(--gap-02);

  .selectedFile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--gap-02);

    padding: 0 12px;
    width: 100%;

    background-color: var(--gray-02);
    border: 1px solid var(--gray-03);
    border-radius: var(--radius);

    color: var(--gray-06);
    font-size: var(--font-size-xxs);
  }
  .fileSelectBox {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 10px;

    font-size: var(--font-size-xxs);
    white-space: nowrap;

    background-color: var(--gray-01);
    border: 1px solid var(--gray-11);
    border-radius: var(--radius);

    cursor: pointer;
  }
  input {
    display: none;
  }
`;

export const FilesBox = styled.ul`
  list-style: none;
  color: var(--font-color-1);

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 40px;

    font-size: var(--font-size-xxs);
    white-space: nowrap;

    padding: 0 12px;
    margin-bottom: var(--gap-02);
    border: 1px solid var(--gray-08);
    border-radius: var(--radius);

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--gap-01);
    }
  }
  svg {
    cursor: pointer;
  }
`;

export const FileSizeBox = styled.div`
  padding: 1px 4px;
  border-radius: 2px;
  background-color: var(--gray-02);

  color: var(--font-color-1);
  font-size: var(--font-size-xxs);
`;

interface uploadFileProps {
  registeredFiles: string[];
  attachments: File[];
  token: NonNullable<TokenType>;
  userID: string;
}
const uploadFileFn = async ({
  registeredFiles,
  attachments,
  token,
  userID,
}: uploadFileProps): Promise<{ message: string; uploadFilesName: any[] }> => {
  let value: string[];

  try {
    const uploadedFileList = await uploadFiles(attachments, userID);

    value = [...registeredFiles, ...uploadedFileList];

    // 모든 파일이 업로드되었음을 알리는 메시지와 함께 메타데이터 배열을 반환합니다.
    const response = await fetch("/api/user/portfolios", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userID, value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage);
    }

    return {
      message: "All files have been uploaded successfully.",
      uploadFilesName: value,
    };
  } catch (error) {
    throw error;
  }
};

interface removeFileProps {
  value: string[];
  fileName: string;
  token: NonNullable<TokenType>;
  userID: string;
}
const removeFileFn = async ({
  value,
  fileName,
  token,
  userID,
}: removeFileProps): Promise<{ message: string; removeData: any[] }> => {
  try {
    const fileRef = ref(storage, `${userID}/${fileName}`);
    // Storage에서 파일 삭제
    await deleteObject(fileRef);
    console.log("Storage에서 파일이 삭제되었습니다.");

    // Firestore에서 파일 참조 삭제
    const response = await fetch("/api/user/portfolios", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userID, value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage);
    }

    return {
      message: `${fileName} 파일이 삭제되었습니다.`,
      removeData: [],
    };
  } catch (error) {
    throw error;
  }
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface UploadFile {
  userFiles: string[] | undefined;
}
const UploadFile = ({ userFiles }: UploadFile) => {
  const [{ userID, idToken: token }] = useAtom(userAtom);

  const [attachments, setAttachments] = useState<File[]>([]);
  const [isUploadFileModal, setIsUploadFileModal] = useState(false);

  const [registeredFilesName, setRegisteredFilesName] = useState(
    userFiles ?? []
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    const file = selectedFiles[0];

    const isDuplicateFile = attachments.some(
      (attachment) => attachment.name === file.name
    );

    if (isDuplicateFile) {
      alert("중복된 파일입니다.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert(`${file.name} 파일의 크기가 50MB를 초과하여 제외되었습니다.`);
    } else {
      setAttachments((prev) => [...prev, file]);
    }
  };

  const mutation = useMutation({
    mutationFn: uploadFileFn,
  });

  const uploadFile = async () => {
    if (!attachments.length) {
      alert("파일을 선택해주세요.");
      return;
    }

    mutation.mutate(
      {
        registeredFiles: registeredFilesName,
        attachments,
        token,
        userID,
      },
      {
        onSuccess: (data) => {
          setAttachments(() => []);
          setRegisteredFilesName(() => data.uploadFilesName);
          setIsUploadFileModal(() => false);
          alert(data.message); // 성공 메시지 출력
        },
      }
    );
  };

  const removeMutation = useMutation({
    mutationFn: removeFileFn,
  });

  const removeFile = (fileName: string) => {
    if (window.confirm(`${fileName} 해당 파일을 삭제하시겠습니까?`)) {
      const value = registeredFilesName.filter((file) => {
        const [name, size] = file.split("/");
        return name !== fileName;
      });

      removeMutation.mutate(
        {
          value,
          fileName,
          token,
          userID,
        },
        {
          onSuccess: (data) => {
            setRegisteredFilesName(() => value);
            alert(data.message);
          },
        }
      );
    }
  };

  const cancelHandler = () => {
    setIsUploadFileModal(() => false);
    setAttachments(() => []);
  };

  const uploadRemoveFile = (fileName: string) => {
    setAttachments(attachments.filter((file) => file.name !== fileName));
  };

  return (
    <>
      <div>
        <button onClick={() => setIsUploadFileModal(true)}>
          파일 추가하기
        </button>

        <FilesBox>
          {registeredFilesName.map((fileInfo) => {
            const [name, size] = fileInfo.split("/");
            return (
              <li key={name}>
                <div>
                  <GoFile />
                  <span>{name}</span>
                  <FileSizeBox>{formatFileSize(+size)}</FileSizeBox>
                </div>
                <HiOutlineXMark onClick={() => removeFile(name)} />
              </li>
            );
          })}
        </FilesBox>
      </div>

      {isUploadFileModal && (
        <>
          <UploadModalWrap>
            <p className="title">파일 첨부</p>
            <p className="explanation">
              파일(PDF, PNG, JPG, JPEG, GIP)은 최대 50MB까지 가능합니다.
            </p>
            <FileSelectBox>
              <div className="selectedFile">
                <GoFile />
                {attachments.length > 0
                  ? attachments[attachments.length - 1].name
                  : "선택한 파일이 없습니다."}
              </div>
              <label htmlFor="file">
                <div className="fileSelectBox">파일 선택</div>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                accept=".pdf, .png, .jpg, .jpeg, .gif"
                autoComplete="off"
              />
            </FileSelectBox>
            <Hr />
            <FilesBox>
              {attachments.map((file) => {
                return (
                  <li key={file.name}>
                    <div>
                      <GoFile />
                      <span>{file.name}</span>
                      <FileSizeBox>{formatFileSize(file.size)}</FileSizeBox>
                    </div>
                    <HiOutlineXMark
                      onClick={() => uploadRemoveFile(file.name)}
                    />
                  </li>
                );
              })}
            </FilesBox>
            <Buttons>
              <CancelButton cancelHandler={cancelHandler} />
              <Button
                type="button"
                disabled={attachments.length === 0}
                text="등록"
                onClick={uploadFile}
              />
            </Buttons>
          </UploadModalWrap>
          <BackgroundModal />
        </>
      )}
    </>
  );
};

export default UploadFile;
