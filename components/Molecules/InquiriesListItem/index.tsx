import { memo, useMemo, useState } from "react";
import Link from "next/link";

import styled from "@emotion/styled";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

import type { Inquiries } from "@/types/inquiries";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import Button from "@/components/Atoms/Button";
import { TokenType } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;

  position: relative;

  p:nth-of-type(1) {
    flex: 0.6;
  }
  p:nth-of-type(2) {
    flex: 0.6;
  }
  p:nth-of-type(3) {
    flex: 1;
  }
  p:nth-of-type(4) {
    flex: 1;
  }
  p:nth-of-type(5) {
    flex: 0.3;
  }
`;

const InquiriesBox = styled.div`
  .questionBox,
  .answerBox {
    display: flex;
  }

  .questionBox {
    .questionIcon {
    }
    .question {
    }
  }

  .answerBox {
    .answerIcon {
    }
    .answer {
    }
  }
`;

const DropDownBox = styled.div`
  position: absolute;
  right: 0;
`;

interface InquiriesAnswerProps {
  id: string;
  answerContent: string;
  token: NonNullable<TokenType>;
}
const InquiriesAnswer = async ({
  id,
  answerContent,
  token,
}: InquiriesAnswerProps): Promise<any> => {
  const response = await fetch(`/api/inquiries/${id}/answer`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(answerContent),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }
  return response.json();
};

interface InquiriesListItemProps extends Inquiries {
  id: string;
}
const InquiriesListItem = ({
  dateOfInquiry,
  questionerId,
  responderId,
  inquiryPostId,
  inquiryPostTitle,
  questionContent,
  answerContent: initialAnswerContent,
  id,
}: InquiriesListItemProps) => {
  const [{ userID, idToken }] = useAtom(userAtom);
  const [respondValue, setRespondValue] = useState("");
  const [isInquiriesDetailClick, setIsInquiriesDetailClick] = useState(false);

  const [answerContent, setAnswerContent] = useState(initialAnswerContent);

  const RESPONDAUTHORITY = useMemo(() => userID === responderId, []);
  const MAXLENGTH = 10000;

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;

    // 최대 글자 수 제한
    if (value.length <= MAXLENGTH) {
      setRespondValue(() => value);
    }
  };

  const mutation = useMutation({
    mutationFn: InquiriesAnswer,
  });

  const mutateData: InquiriesAnswerProps = {
    id,
    answerContent: respondValue,
    token: idToken,
  };

  const InquiriesHandler = () => {
    mutation.mutate(mutateData, {
      onSuccess: (response) => {
        alert(response.message);
        setAnswerContent(() => respondValue);
      },
    });
  };

  console.log(answerContent);
  return (
    <>
      <ListItem>
        <p>{dateOfInquiry}</p>
        <p>{responderId}</p>
        <p>
          <Link href={`/announcements/${inquiryPostId}`}>
            <span>{inquiryPostTitle}</span>
          </Link>
        </p>
        <p>{questionerId}</p>
        <p>{answerContent ? "답변완료" : "미응답"}</p>
        <DropDownBox onClick={() => setIsInquiriesDetailClick((prev) => !prev)}>
          {isInquiriesDetailClick ? <HiChevronUp /> : <HiChevronDown />}
        </DropDownBox>
      </ListItem>

      {isInquiriesDetailClick && (
        <InquiriesBox>
          <div className="questionBox">
            <div className="questionIcon">Q</div>
            <p className="question">{questionContent}</p>
          </div>
          <div className="answerBox">
            <div className="answerIcon">A</div>

            {!RESPONDAUTHORITY && (
              <p className="answer">
                {answerContent ? answerContent : "아직 답변이 없습니다."}
              </p>
            )}

            {RESPONDAUTHORITY && answerContent && (
              <p className="answer">{answerContent}</p>
            )}

            {RESPONDAUTHORITY && !answerContent && (
              <div>
                <textarea
                  autoComplete="off"
                  maxLength={MAXLENGTH}
                  value={respondValue}
                  onChange={handleTextareaChange}
                  name="answerContent"
                />
                <span>
                  {respondValue.length}/{MAXLENGTH}
                </span>
                <Button
                  type="button"
                  text="답변하기"
                  onClick={InquiriesHandler}
                />
              </div>
            )}
          </div>
        </InquiriesBox>
      )}
    </>
  );
};

export default memo(InquiriesListItem);
