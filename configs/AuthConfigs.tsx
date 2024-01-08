"use client";
/**react, next */
import { useEffect } from "react";

/**상태관리 */
import { useAtom } from "jotai";
import { idTokenAtom } from "@/atoms/auth/idTokenAtom";
import { useRefreshToken } from "@/hooks/useRefreshToken";

/**hook */

const AuthManager = () => {
  const { refresh } = useRefreshToken();
  const [accessToken, setAccessToken] = useAtom(idTokenAtom);
  console.log("AuthManager 실행했습니다");

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = await refresh();
        const newIdToken = data.idToken;
        setAccessToken(() => newIdToken);
        console.log(accessToken, newIdToken, "<<<<<<<<<<<<<<accessToken");
      } catch (error) {
        // 에러가 발생하면 로그인 페이지로 리디렉션
        console.log("----------에러발생발생", error);
      }
    };

    initializeAuth();
  }, []);

  return null;
};

export default AuthManager;
