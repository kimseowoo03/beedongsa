import { ApplyWithID } from "@/types/apply";
import { atom } from "jotai";

export const applyModalAtom = atom(false);

export const applyStatusModalAtom = atom(false);

export const applyInitialValues = {
  applyID: undefined,
  isApplicationStatus: false,
  isApplicationConfirmationStatus: false,
  isFinalMatchedStatus: false,
  applyType: undefined,
  educatorID: undefined,
  educatorName: undefined,
  educatorPhoneNumber: undefined,
  educatorEmail: undefined,
  lectureID: undefined,
  lectureTitle: undefined,
  attachedFileName: undefined,
  managerName: undefined,
  managerPhoneNumber: undefined,
  managerEmail: undefined,
  clientID: undefined,
  clientName: undefined,
  announcementID: undefined,
  announcementTitle: undefined,
  announcementSchedule: undefined,
  recruitmentDeadline: undefined,
  dateOfInquiry: undefined,
};

export const applyValuesAtom = atom<ApplyWithID>(applyInitialValues);
