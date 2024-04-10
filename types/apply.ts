import { QueryObserverResult } from "@tanstack/react-query";
import type { firestoreQueryDocumentResData } from "./firebaseType";

export interface Apply {
  isApplicationStatus: boolean;
  isApplicationConfirmationStatus: boolean;
  isFinalMatchedStatus: boolean;
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

export interface ApplyWithID extends Apply {
  applyID?: string;
}
export interface ApplyQuery {
  data: firestoreQueryDocumentResData<Apply>[];
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<Apply[], Error>>;
}
