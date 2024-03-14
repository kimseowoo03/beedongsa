import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Button from "@/components/Atoms/Button";
import { CancelButton } from "@/components/Atoms/CancelButton";
import { MultipleSelection } from "@/components/Molecules/CheckboxLabel";

import { useAtom } from "jotai";
import { applyModalAtom } from "@/atoms/modal";
import { userAtom } from "@/atoms/auth";

import styled from "@emotion/styled";
import { BackgroundModal, Buttons, ModalWrap } from "@/styles/Modal";
import { GoFile } from "react-icons/go";
import { HiOutlineXMark } from "react-icons/hi2";
import { Hr } from "@/styles/htmlStyles";
import {
  FileSelectBox,
  FileSizeBox,
  FilesBox,
} from "@/components/Molecules/UploadFile";

import type { TokenType } from "@/types/auth";
import type { Apply } from "@/types/apply";
import type { firestoreQueryDocumentResData } from "@/types/firebaseType";
import type { Lecture } from "@/types/lecture";

import { formatFileSize } from "@/utils/formatFileSize";
import { uploadFiles } from "@/utils/uploadFiles";

const Wrap = styled(ModalWrap)`
  width: 400px;
  height: 500px;
`;

interface createApplyProps {
  inquiriesData: Apply;
  token: NonNullable<TokenType>;
}
const createApply = async ({
  inquiriesData,
  token,
}: createApplyProps): Promise<any> => {
  const response = await fetch("/api/apply/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(inquiriesData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }
  return response.json();
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 50MB
interface ApplyModalProps {
  recruitmentDeadline: string;
  managerName?: string;
  managerPhoneNumber?: number;
  managerEmail?: string;
  clientID: string;
  announcementID: string;
  announcementTitle: string;
  announcementSchedule: string[];
  ProfileDatas: firestoreQueryDocumentResData<Lecture>[];
}
export const ApplyModal = ({
  recruitmentDeadline,
  managerName,
  managerPhoneNumber,
  managerEmail,
  clientID,
  announcementID,
  announcementTitle,
  announcementSchedule,
  ProfileDatas,
}: ApplyModalProps) => {
  const [{ idToken: token, name: educatorName, userID: educatorID }] =
    useAtom(userAtom);
  const [isApplyModal, setIsApplyModal] = useAtom(applyModalAtom);
  const [selection, setSelection] = useState<
    "registeredProfile" | "attachments"
  >("registeredProfile");

  // 날짜와 시간을 문자열로 변환
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // 연도
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 월
  const day = currentDate.getDate().toString().padStart(2, "0"); // 일
  const dateOfInquiry = `${year}-${month}-${day}`;

  const initialValues: Apply = {
    sentStatus: false,
    responseStatus: false,
    matchConfirmationStatus: false,
    applyType: undefined,
    educatorID,
    educatorName,
    educatorPhoneNumber: undefined,
    educatorEmail: undefined,
    lectureID: undefined,
    attachedFileName: undefined,
    managerName,
    managerPhoneNumber,
    managerEmail,
    clientID,
    announcementID,
    announcementTitle,
    announcementSchedule,
    recruitmentDeadline,
    dateOfInquiry,
  };

  const [values, setValues] = useState(initialValues);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [totalMaxFileSize, setTotalMaxFileSize] = useState(0);

  const mutation = useMutation({
    mutationFn: createApply,
  });

  const ApplyHandler = async () => {
    let mutateData: createApplyProps;

    if (selection === "registeredProfile") {
      // 프로필 지원인 경우 , 파일첨부 키는 제거
      mutateData = {
        inquiriesData: {
          ...values,
          sentStatus: true,
          applyType: "registeredProfile",
          attachedFileName: undefined,
        },
        token,
      };

      mutation.mutate(mutateData, {
        onSuccess: (response) => {
          alert(response.message);
          setIsApplyModal(() => false);
          setValues(() => initialValues);
        },
      });
    } else {
      try {
        //1. 파일 업로드
        const fileNames = await uploadFiles(attachments, educatorID);

        // 파일첨부 지원인 경우 , 강의 ID 키는 제거
        mutateData = {
          inquiriesData: {
            ...values,
            sentStatus: true,
            applyType: "attachments",
            lectureID: undefined,
            attachedFileName: fileNames,
          },
          token,
        };

        //2. 파일 업로드 후 지원하기 데이터 생성
        mutation.mutate(mutateData, {
          onSuccess: (response) => {
            alert(response.message);
            setIsApplyModal(() => false);
            setValues(() => initialValues);
          },
        });
      } catch (error) {
        alert("파일 지원에 실패하였습니다.");
      }
    }
  };

  const onChange = useCallback(
    (name: string, type: string, checked: boolean, newValue: string) => {
      setValues((prevValues) => {
        return {
          ...prevValues,
          [name]: checked ? newValue : "",
        };
      });
    },
    []
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

    if (
      file.size > MAX_FILE_SIZE ||
      file.size + totalMaxFileSize > MAX_FILE_SIZE
    ) {
      alert(`${file.name} 파일의 크기가 5MB를 초과했습니다.`);
    } else {
      setAttachments((prev) => [...prev, file]);
      setTotalMaxFileSize((prev) => prev + file.size);
    }
  };

  const uploadRemoveFile = (fileName: string, fileSize: number) => {
    setAttachments(attachments.filter((file) => file.name !== fileName));
    setTotalMaxFileSize((prev) => prev - fileSize);
  };

  if (!isApplyModal) {
    return;
  }
  return (
    <>
      <Wrap>
        <h2>지원하기</h2>

        <label>
          <input
            type="radio"
            value="registeredProfile"
            checked={selection === "registeredProfile"}
            onChange={() => setSelection("registeredProfile")}
          />
          등록된 프로필 선택
        </label>
        <label>
          <input
            type="radio"
            value="attachments"
            checked={selection === "attachments"}
            onChange={() => setSelection("attachments")}
          />
          파일첨부
        </label>

        {selection === "registeredProfile" ? (
          <div>
            {ProfileDatas ? (
              <MultipleSelection values={values.lectureID}>
                {ProfileDatas.map((lecture) => {
                  return (
                    <MultipleSelection.CheckboxLabel
                      key={lecture.id}
                      label={lecture.data.title}
                      type="checkbox"
                      name="lectureID"
                      id={lecture.data.title}
                      value={lecture.id}
                      onChange={onChange}
                      checked={values.lectureID === lecture.id}
                    />
                  );
                })}
              </MultipleSelection>
            ) : (
              <p>등록된 프로필이 없습니다.</p>
            )}
          </div>
        ) : (
          <div>
            <p className="title">파일 첨부</p>
            <p className="explanation">
              첨부된 파일(PDF, PNG, JPG, JPEG, GIP)들은 총 5MB까지 가능합니다.
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
                const size = formatFileSize(file.size);
                return (
                  <li key={file.name}>
                    <div>
                      <GoFile />
                      <span>{file.name}</span>
                      <FileSizeBox>{size}</FileSizeBox>
                    </div>
                    <HiOutlineXMark
                      onClick={() => uploadRemoveFile(file.name, file.size)}
                    />
                  </li>
                );
              })}
            </FilesBox>
            <p>{formatFileSize(totalMaxFileSize)}</p>
          </div>
        )}

        <Buttons>
          <CancelButton cancelHandler={() => setIsApplyModal(false)} />
          <Button type="button" text="지원하기" onClick={ApplyHandler} />
        </Buttons>
      </Wrap>
      <BackgroundModal />
    </>
  );
};
