import { applyStatusAtom, applyStatusModalAtom } from "@/atoms/apply";
import { Apply } from "@/types/apply";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";

interface ApplyListItemProps extends Apply {
  id: string;
}
export const ApplyListItem = ({
  id,
  sentStatus,
  responseStatus,
  matchConfirmationStatus,
  applyType,
  educatorID,
  educatorName,
  educatorPhoneNumber,
  educatorEmail,
  lectureID,
  lectureTitle,
  attachedFileName,
  managerName,
  managerPhoneNumber,
  managerEmail,
  clientID,
  clientName,
  announcementID,
  announcementTitle,
  announcementSchedule,
  recruitmentDeadline,
  dateOfInquiry,
}: ApplyListItemProps) => {
  const setApplyStatusModal = useSetAtom(applyStatusModalAtom);
  const setApplyStatus = useSetAtom(applyStatusAtom);

  const handleCheckApplyStatus = () => {
    console.log("클릭");
    setApplyStatus({
      sentStatus,
      responseStatus,
      matchConfirmationStatus,
    });
    setApplyStatusModal(() => true);
  };

  return (
    <li>
      <p>{clientName}</p>
      <div>
        <p>
          <Link href={`/announcements/${announcementID}`}>
            {announcementTitle}
          </Link>
        </p>
        <button type="button" onClick={handleCheckApplyStatus}>
          지원 현황 확인
        </button>
      </div>
      <div>
        <span>{dateOfInquiry}</span>

        <ApplyTypeDetail
          applyType={applyType}
          lectureID={lectureID}
          lectureTitle={lectureTitle}
          attachedFileName={attachedFileName}
        />
      </div>
    </li>
  );
};
const ApplyTypeDetail = ({
  applyType,
  lectureID,
  lectureTitle,
  attachedFileName,
}) => {
  const [isApplyTypeDetails, setIsApplyTypeDetails] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsApplyTypeDetails((prev) => !prev)}
      >
        {applyType === "registeredProfile" ? "프로필 지원" : "파일 지원"}
      </button>

      {isApplyTypeDetails && (
        <ul>
          {applyType === "registeredProfile" ? (
            <li>
              <span>프로필</span>
              <Link href={`/lectures/${lectureID}`}>{lectureTitle}</Link>
            </li>
          ) : (
            attachedFileName.map((fileName) => {
              const [name, size] = fileName.split("/");
              return (
                <li key={name}>
                  <span>첨부파일</span>
                  <span>{name}</span>
                </li>
              );
            })
          )}
        </ul>
      )}
    </>
  );
};
