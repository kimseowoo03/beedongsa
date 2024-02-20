export type UserType = "client" | "educator";

interface User {
  type?: UserType;
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
  serviceTermsAccepted?: boolean;
  privacyPolicyAgreed?: boolean;
  eventEnabled?: boolean;
}

export interface EducatorUser extends User {
  type: "educator";
  educatorType: Array<"lecture" | "consulting">;
  lectureTopic: Array<string>;
  experience: number;
  experienceRecord: Array<string>;
  certificate: Array<string>;
  etcRecord: Array<string>;
  education: Array<string>;
  portfolios: Array<string>;
}

export interface ClientUser extends User {
  type: "client";
  managerName: string;
  managerEmail: string;
  managerPhoneNumber: number;
  AnnouncementList: Array<string>;
}
