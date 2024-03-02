import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Button from "@/components/Atoms/Button";
import { CancelButton } from "@/components/Atoms/CancelButton";

import { useAtom } from "jotai";
import { inquiriesModalAtom } from "@/atoms/modal";
import { userAtom } from "@/atoms/auth";

import styled from "@emotion/styled";
import { BackgroundModal, Buttons, ModalWrap } from "@/styles/Modal";

import type { Inquiries } from "@/types/inquiries";
import type { TokenType } from "@/types/auth";

const Wrap = styled(ModalWrap)`
  width: 400px;
  height: 500px;
`;

interface createInquiriesProps {
  inquiriesData: Inquiries;
  token: NonNullable<TokenType>;
}
const createInquiries = async ({
  inquiriesData,
  token,
}: createInquiriesProps): Promise<any> => {
  console.log(inquiriesData, token);
  const response = await fetch("/api/inquiries/create", {
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

interface InquiriesModalProps {
  inquiryPostTitle: string;
  inquiryPostId: string;
  responderId: string;
}
export const InquiriesModal = ({
  inquiryPostTitle,
  inquiryPostId,
  responderId,
}: InquiriesModalProps) => {
  const [{ idToken, email, userID }] = useAtom(userAtom);
  const [isInquiriesModal, setIsInquiriesModal] = useAtom(inquiriesModalAtom);
  const MAXLENGTH = 10000;

  // 날짜와 시간을 문자열로 변환
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // 연도
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 월
  const day = currentDate.getDate().toString().padStart(2, "0"); // 일
  const dateOfInquiry = `${year}년 ${month}월 ${day}일`;

  //questioner의 경우 초기 데이터가 필요하지 않습니다.
  const initialValues: Inquiries = {
    dateOfInquiry,
    questionerId: userID,
    responderId,
    inquiryPostId,
    inquiryPostTitle,
    questionContent: "",
    answerContent: "",
  };

  const [values, setValues] = useState(initialValues);

  const mutation = useMutation({
    mutationFn: createInquiries,
  });

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;

    // 최대 글자 수 제한
    if (value.length <= MAXLENGTH) {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const mutateData: createInquiriesProps = {
    inquiriesData: values,
    token: idToken,
  };

  const InquiriesHandler = () => {
    mutation.mutate(mutateData, {
      onSuccess: (response) => {
        alert(response.message);
        setIsInquiriesModal(() => false);
        setValues(() => initialValues);
      },
    });
  };

  if (!isInquiriesModal) {
    return;
  }

  return (
    <>
      <Wrap>
        <h2>문의하기</h2>
        <p>상세 페이지 제목</p>
        <div>
          <span>To. {values.questionerId}</span>
          <textarea
            autoComplete="off"
            maxLength={MAXLENGTH}
            value={values.questionContent}
            onChange={handleTextareaChange}
            name="questionContent"
          />
          <span>
            {values.questionContent.length}/{MAXLENGTH}
          </span>
        </div>

        <Buttons>
          <CancelButton cancelHandler={() => setIsInquiriesModal(false)} />
          <Button type="button" text="문의하기" onClick={InquiriesHandler} />
        </Buttons>
      </Wrap>
      <BackgroundModal />
    </>
  );
};
