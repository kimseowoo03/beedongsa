interface Announcement {
  registeredEmail: string;
  title: string;
  category: Array<string>;
  metropolitanCity: string;
  dstrict: string;
  detailedAddress: string;
  schedule: Array<string>;
  recruitmentDeadline: string;
  target: Array<
    "영유아" | "초등학생" | "중학생" | "고등학생" | "청년" | "기업" | "노인"
  >;
  personnel: number;
  totalCost: number;
  supportIncludedInTheCost: Array<"숙박지원" | "식사지원" | "차비지원">;
  detail: string;
  desiredExperience: number;
  desiredQualifications: string;
  preferredLectureOrConsultingStyle: Array<string>;
  AdministratorApproval: boolean;
}
