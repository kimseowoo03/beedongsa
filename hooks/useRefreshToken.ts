import { idTokenAtom } from "@/atoms/auth/idTokenAtom";
import { useAtom } from "jotai";

const useRefreshToken = () => {
  const [, setAccessToken] = useAtom(idTokenAtom);

  const refresh = async () => {
    // 서버에 refreshToken을 사용한 요청 보내기
    const response = await fetch("/api/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage);
    }

    // 받은 accessToken으로 상태 업데이트
    // setAccessToken(newAccessToken);
  };

  return { refresh };
};
