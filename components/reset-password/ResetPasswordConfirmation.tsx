/**react, next */
import { useRouter } from "next/router";

/**style */
import styled from "@emotion/styled";
import CompletedSVG from "@/public/reset-password/completed.svg";

/**components */
import Button from "../common/Button";

export const ResetPasswordConfirmation = () => {
  const router = useRouter();

  return (
    <div>
      <CompletedSVG />
      <p>재설정 메일 전송 완료!</p>
      <Button text="확인" type="button" onClick={() => router.push("/")} />
    </div>
  );
};
