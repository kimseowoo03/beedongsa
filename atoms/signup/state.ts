import { atom } from "jotai";

export const SIGNUP_PAGE_VALUES = {
  USER_TYPE_PAGE: "USER_TYPE_PAGE",
  EMAIL_PAGE: "EMAIL_PAGE",
};

export const signupPageAtom = atom(SIGNUP_PAGE_VALUES.USER_TYPE_PAGE);
