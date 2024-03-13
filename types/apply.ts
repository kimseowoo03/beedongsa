export interface Apply {
  sentStatus: boolean;
  responseStatus: boolean;
  matchConfirmationStatus: boolean;
  educatorID: string;
  educatorName: string;
  educatorPhoneNumber: string;
  educatorEmail: string;
  lectureID: string;
  attachedFileName: string;
  managerName: string;
  managerPhoneNumber: number;
  managerEmail: string;
  clientID: string;
  announcementID: string;
  announcementTitle: string;
  announcementSchedule: Array<string>;
  recruitmentDeadline: string;
  dateOfInquiry: string;
}
