export interface Lecture {
  registeredEmail: string;
  title: string;
  description: string;
  category: Array<string>;
  availableRegions: Array<string>;
  isDemoLecture: "무료가능" | "유료가능" | "불가능";
  target: Array<
    | "영유아"
    | "초등학생"
    | "중학생"
    | "고등학생"
    | "청년"
    | "장년"
    | "중년"
    | "기업"
  >;
  totalTime: number;
  expense: Array<string>;
  multiSessionPricing: string;
  additionalCost: string;
  includedDetails: string;
  isLongDistance: "Y" | "N";
  linkAttached: Array<string>;
  interview1: string;
  interview2: string;
  interview3: string;
  curriculum: Array<string>;
  administratorApproval: boolean;
  closeLectures: boolean;
  temporaryStorage: boolean;
}
