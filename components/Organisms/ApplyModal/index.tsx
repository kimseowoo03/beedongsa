import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Button from "@/components/Atoms/Button";
import { CancelButton } from "@/components/Atoms/CancelButton";
import { MultipleSelection } from "@/components/Molecules/CheckboxLabel";

import { useAtom } from "jotai";
import { applyModalAtom } from "@/atoms/modal";
import { userAtom } from "@/atoms/auth";

import styled from "@emotion/styled";
import { BackgroundModal, Buttons, ModalWrap } from "@/styles/Modal";

import type { TokenType } from "@/types/auth";
import type { Apply } from "@/types/apply";
import type { firestoreQueryDocumentResData } from "@/types/firebaseType";
import type { Lecture } from "@/types/lecture";

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
  const [{ idToken, name: educatorName, userID: educatorID }] =
    useAtom(userAtom);
  const [isApplyModal, setIsApplyModal] = useAtom(applyModalAtom);
  const [selection, setSelection] = useState("registeredProfile");

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

  const mutation = useMutation({
    mutationFn: createApply,
  });

  const ApplyHandler = () => {
    const mutateData: createApplyProps = {
      inquiriesData: { ...values, sentStatus: true },
      token: idToken,
    };

    mutation.mutate(mutateData, {
      onSuccess: (response) => {
        alert(response.message);
        setIsApplyModal(() => false);
        setValues(() => initialValues);
      },
    });
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
            onChange={(e) => setSelection(e.target.value)}
          />
          등록된 프로필 선택
        </label>
        <label>
          <input
            type="radio"
            value="attachments"
            checked={selection === "attachments"}
            onChange={(e) => setSelection(e.target.value)}
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
          <div>파일 첨부</div>
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
