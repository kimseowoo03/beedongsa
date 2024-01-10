import { atom } from "jotai";

export const RESET_PASSWORD_PAGE_VALUES = {
  SEND_EMAIL_PAGE: "SEND_EMAIL_PAGE",
  COMPLETED_PAGE: "COMPLETED_PAGE",
};

export const resetPasswordPageAtom = atom(
  RESET_PASSWORD_PAGE_VALUES.SEND_EMAIL_PAGE
);
