import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Resizer from "react-image-file-resizer";

import { storage } from "@/app/firebaseConfig";
import { ref, uploadBytes, deleteObject } from "firebase/storage";

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

const FileSelectBox = styled.div`
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

const FilesBox = styled.ul`
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

const FileSizeBox = styled.div`
  padding: 1px 4px;
  border-radius: 2px;
  background-color: var(--gray-02);

  color: var(--font-color-1);
  font-size: var(--font-size-xxs);
`;

const resizeFile = (file: File): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const outputFormat = file.type === "image/png" ? "PNG" : "JPEG";

    Resizer.imageFileResizer(
      file, // 파일 객체
      600, // 최대 너비
      600, // 최대 높이
      outputFormat, // 변환될 이미지 형식
      60, // 품질
      0, // 회전
      (uri) => {
        // 'file' 타입으로 반환될 경우, Blob 형식으로 변환
        if (uri instanceof Blob) {
          // 이미 Blob이면 그대로 사용
          resolve(uri);
        }
      },
      "file" // 반환될 파일 형식 (base64, blob, file 중 선택)
    );
  });

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
}: uploadFileProps): Promise<{ message: string; uploads: any[] }> => {
  let value: string[] = [...registeredFiles];

  try {
    await Promise.all(
      attachments.map(async (file) => {
        const fileRef = ref(storage, `${userID}/${file.name}`);
        const metadata = { contentType: file.type };

        if (file.type === "image/png" || file.type === "image/jpeg") {
          const resizedImage = await resizeFile(file);
          file = new File([resizedImage], file.name, {
            type: file.type,
          });
        }

        //1. storage에 업로드
        const uploadResult = await uploadBytes(fileRef, file, metadata);
        value.push(`${file.name}/${file.size}`);

        return uploadResult.metadata;
      })
    );

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
      uploads: value,
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

  const [registeredFiles, setRegisteredFiles] = useState(userFiles ?? []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 1) {
      // 파일이 여러 개인 경우에는 파일 크기를 검사하여 유효한 파일만 배열에 추가

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (file.size <= MAX_FILE_SIZE) {
          setAttachments((prev) => [...prev, file]);
        } else {
          alert(`${file.name} 파일의 크기가 50MB를 초과하여 제외되었습니다.`);
        }
      }
    } else if (selectedFiles.length === 1) {
      // 파일이 한 개인 경우에는 바로 파일 크기를 검사하여 처리
      const file = selectedFiles[0];
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} 파일의 크기가 50MB를 초과하여 제외되었습니다.`);
      } else {
        setAttachments((prev) => [...prev, file]);
      }
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
        registeredFiles,
        attachments,
        token,
        userID,
      },
      {
        onSuccess: (data) => {
          setAttachments(() => []);
          setRegisteredFiles(() => data.uploads);
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
      const value = registeredFiles.filter((file) => {
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
            setRegisteredFiles(() => value);
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
          {registeredFiles.map((fileInfo) => {
            const [name, size] = fileInfo.split("/");
            const fileSize =
              +size >= 1024 * 1024
                ? `${(+size / (1024 * 1024)).toFixed(2)} MB`
                : `${(+size / 1024).toFixed(1)} KB`;
            return (
              <li key={name}>
                <div>
                  <GoFile />
                  <span>{name}</span>
                  <FileSizeBox>{fileSize}</FileSizeBox>
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
                const size =
                  file.size >= 1024 * 1024
                    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                    : `${(file.size / 1024).toFixed(1)} KB`;

                return (
                  <li key={file.name}>
                    <div>
                      <GoFile />
                      <span>{file.name}</span>
                      <FileSizeBox>{size}</FileSizeBox>
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
