import { atom } from "jotai";
import { signupPageAtom, SIGNUP_PAGE_VALUES } from "./state";

export const signupPageNextAtom = atom(null, (get, set) => {
  const currentPage = get(signupPageAtom);

  // userType 페이지 다음에는 항상 email 페이지로 이동
  if (currentPage === SIGNUP_PAGE_VALUES.USER_TYPE_PAGE) {
    set(signupPageAtom, SIGNUP_PAGE_VALUES.EMAIL_PAGE);
  }
});
