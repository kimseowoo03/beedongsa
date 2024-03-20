import { QueryObserverResult } from "@tanstack/react-query";

export interface Apply {
  sentStatus: boolean;
  responseStatus: boolean;
  matchConfirmationStatus: boolean;
  applyType: "registeredProfile" | "attachments";
  educatorID: string;
  educatorName: string;
  educatorPhoneNumber: string;
  educatorEmail: string;
  lectureID: string;
  lectureTitle: string;
  attachedFileName: Array<string>;
  managerName: string;
  managerPhoneNumber: number;
  managerEmail: string;
  clientID: string;
  clientName: string;
  announcementID: string;
  announcementTitle: string;
  announcementSchedule: Array<string>;
  recruitmentDeadline: string;
  dateOfInquiry: string;
}

export interface ApplyQuery {
  data: {
    createTime: string;
    data: Apply;
    id: string;
  }[];
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<Apply[], Error>>;
}
