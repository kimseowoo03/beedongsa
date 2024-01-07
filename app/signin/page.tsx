"use client";
import { Signin } from "@/components/signin/Signin";
import styled from "@emotion/styled";

const SigninSectionWrap = styled.section`
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
  }
`;

function SigninPage() {
  return (
    <SigninSectionWrap>
      <Signin />
    </SigninSectionWrap>
  );
}

export default SigninPage;
