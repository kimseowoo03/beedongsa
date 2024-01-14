"use client";

/**react, next */
import { ReactElement, useState } from "react";

/**상태관리 */
import { useAtomValue } from "jotai";
import { SIGNUP_PAGE_VALUES, signupPageAtom } from "@/atoms/signup/state";

/**style */
import styled from "@emotion/styled";

/**components */
import { UserTypeSelection } from "@/components/signup/UserTypeSelection";
import { UserForm } from "@/components/signup/UserForm";

/**type */
import { UserType } from "@/types/user";

const SignupSectionWrap = styled.section`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
    margin: 0 auto;
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
      font-weight: var(--font-weight-regular);
      margin: 10px 0 40px 0;
    }
  }
`;

export default function SignupPage() {
  const page = useAtomValue(signupPageAtom);

  const [userType, setUserType] = useState<UserType>("client");

  let content: ReactElement<any>;

  switch (page) {
    case SIGNUP_PAGE_VALUES.EMAIL_PAGE:
      content = <UserForm type={userType} />;
      break;

    default:
      content = (
        <UserTypeSelection
          updateUserType={(userType) => setUserType(() => userType)}
        />
      );
      break;
  }
  return <SignupSectionWrap>{content}</SignupSectionWrap>;
}
