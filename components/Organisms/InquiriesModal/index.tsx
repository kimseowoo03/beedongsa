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
  inquiriesData?: Inquiries;
  inquiryPostTitle: string;
  inquiryPostId: string;
  responderId: string;
  inquiriesUserType: "questioner" | "responder";
}
export const InquiriesModal = ({
  inquiriesUserType,
  inquiryPostTitle,
  inquiryPostId,
  responderId,
  inquiriesData,
}: InquiriesModalProps) => {
  const [{ idToken, email, userID }] = useAtom(userAtom);
  const [isInquiriesModal, setIsInquiriesModal] = useAtom(inquiriesModalAtom);
  const MAXLENGTH = 10000;

  //questioner의 경우 초기 데이터가 필요하지 않습니다.
  const initialValues: Inquiries =
    inquiriesUserType === "questioner"
      ? {
          questionerId: userID,
          responderId,
          inquiryPostId,
          inquiryPostTitle,
          questionContent: "",
          answerContent: "",
        }
      : {
          questionerId: "",
          responderId: "",
          inquiryPostId: "",
          inquiryPostTitle: "",
          questionContent: "",
          answerContent: "",
          ...inquiriesData,
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
    if (inquiriesUserType === "questioner") {
      mutation.mutate(mutateData, {
        onSuccess: (response) => {
          alert(response.message);
          setIsInquiriesModal(() => false);
          setValues(() => initialValues);
        },
      });
    }
  };

  if (!isInquiriesModal) {
    return;
  }

  return (
    <>
      <Wrap>
        <h2>문의하기</h2>
        <p>상세 페이지 제목</p>

        {inquiriesUserType === "questioner" && (
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
        )}

        {inquiriesUserType === "responder" && (
          <div>
            <span>From. {values.responderId}</span>
            <textarea
              autoComplete="off"
              maxLength={MAXLENGTH}
              value={values.answerContent}
              onChange={handleTextareaChange}
              name="answerContent"
            />
            <span>
              {values.answerContent.length}/{MAXLENGTH}
            </span>
          </div>
        )}

        <Buttons>
          <CancelButton cancelHandler={() => setIsInquiriesModal(false)} />
          <Button type="button" text="문의하기" onClick={InquiriesHandler} />
        </Buttons>
      </Wrap>
      <BackgroundModal />
    </>
  );
};
