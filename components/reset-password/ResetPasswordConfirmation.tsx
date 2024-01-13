/**react, next */
import { useRouter } from "next/navigation";

/**style */
import styled from "@emotion/styled";
import CompletedSVG from "@/public/image/completed.svg";

/**components */
import Button from "../common/Button";

const Wrap = styled.div`
  max-width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
`;
export const ResetPasswordConfirmation = () => {
  const router = useRouter();

  return (
    <Wrap>
      <CompletedSVG />
      <p className="title">재설정 메일 전송 완료!</p>
      <Button
        text="확인"
        type="button"
        onClick={() => router.push("/signin")}
      />
    </Wrap>
  );
};
