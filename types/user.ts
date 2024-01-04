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
}

export interface ClientUser extends User {
  type: "client";
  managerName: string;
  managerEmail: string;
  managerPhoneNumber: string;
}
