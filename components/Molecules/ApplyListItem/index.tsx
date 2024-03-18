import { Apply } from "@/types/apply";

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
  return <li>{announcementTitle}</li>;
};
