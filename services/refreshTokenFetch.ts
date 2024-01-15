import { cookies } from "next/headers";

export async function refreshTokenFetch() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken").value;

    if (!refreshToken) {
      // 리프레시 토큰이 없는 경우
      return null;
    }

    //TODO: 로컬, 배포 url에 따라 설정
    const response = await fetch("http://localhost:3001/api/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("roootdata", error);
  }
}
