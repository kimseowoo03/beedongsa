"use client";
/**react, next */
import { ReactElement } from "react";

/**style */
import styled from "@emotion/styled";

/**상태관리 */
import { useAtomValue } from "jotai";
import {
  RESET_PASSWORD_PAGE_VALUES,
  resetPasswordPageAtom,
} from "@/atoms/reset-password/state";

/**components */
import { ResetPasswordRequest } from "@/components/Templates/ResetPasswordRequest";
import { ResetPasswordConfirmation } from "@/components/Templates/ResetPasswordConfirmation";

export default function ResetPasswordPage() {
  const page = useAtomValue(resetPasswordPageAtom);

  let content: ReactElement<any>;

  switch (page) {
    case RESET_PASSWORD_PAGE_VALUES.COMPLETED_PAGE:
      content = <ResetPasswordConfirmation />;
      break;

    default:
      content = <ResetPasswordRequest />;
      break;
  }
  return <ResetPasswordSectionWrap>{content}</ResetPasswordSectionWrap>;
}

const ResetPasswordSectionWrap = styled.section`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
    margin: 0 auto;
  }
  .title {
    text-align: center;
    color: var(--font-color-1);
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-bold);
  }
  .description {
    text-align: center;
    color: var(--gray-sub2);
    font-size: var(--font-size-xs);
  }
`;
