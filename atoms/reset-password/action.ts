import { atom } from "jotai";
import { resetPasswordPageAtom, RESET_PASSWORD_PAGE_VALUES } from "./state";

export const resetPasswordPageNextAtom = atom(null, (get, set) => {
  const currentPage = get(resetPasswordPageAtom);

  // 이메일 전송 페이지 다음에는 항상 완료 페이지로 이동
  if (currentPage === RESET_PASSWORD_PAGE_VALUES.SEND_EMAIL_PAGE) {
    set(resetPasswordPageAtom, RESET_PASSWORD_PAGE_VALUES.COMPLETED_PAGE);
  }
});
