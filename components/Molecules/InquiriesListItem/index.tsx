import { memo, useState } from "react";
import Link from "next/link";

import styled from "@emotion/styled";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

import type { Inquiries } from "@/types/inquiries";

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;

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
    flex: 0.2;
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

const InquiriesListItem = ({
  dateOfInquiry,
  questionerId,
  responderId,
  inquiryPostId,
  inquiryPostTitle,
  questionContent,
  answerContent,
}: Inquiries) => {
  const [isInquiriesDetailClick, setIsInquiriesDetailClick] = useState(false);

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
        <div onClick={() => setIsInquiriesDetailClick((prev) => !prev)}>
          {isInquiriesDetailClick ? <HiChevronUp /> : <HiChevronDown />}
        </div>
      </ListItem>

      {isInquiriesDetailClick && (
        <InquiriesBox>
          <div className="questionBox">
            <div className="questionIcon">Q</div>
            <p className="question">{questionContent}</p>
          </div>
          <div className="answerBox">
            <div className="answerIcon">A</div>
            <p className="answer">
              {answerContent ? answerContent : "아직 답변이 없습니다."}
            </p>
          </div>
        </InquiriesBox>
      )}
    </>
  );
};

export default memo(InquiriesListItem);
