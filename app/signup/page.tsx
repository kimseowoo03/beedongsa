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

const SignupSectionWrap = styled.section`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    text-align: center;

    width: 100%;
    margin: 0 auto;
    .title {
      color: var(--font-color-1);
      font-size: var(--font-size-m);
      font-weight: var(--font-weight-bold);
    }
    .description {
      color: var(--gray-sub2);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-regular);
      margin: 10px 0 40px 0;
    }
  }
`;

function SignupPage() {
  const page = useAtomValue(signupPageAtom);

  const [userType, setUserType] = useState("");

  let content: ReactElement<any>;

  switch (page) {
    case SIGNUP_PAGE_VALUES.EMAIL_PAGE:
      content = <div>이메일 페이지입니다.</div>;
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

export default SignupPage;
