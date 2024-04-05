import { cookies } from "next/headers";

export async function refreshTokenFetch() {
  try {
    const cookieJar = cookies();
    const refreshTokenCookie = cookieJar.get("refreshToken");

    if (!refreshTokenCookie) {
      return;
    }

    const refreshToken = refreshTokenCookie.value;

    //TODO: 로컬, 배포 url에 따라 설정
    const response = await fetch("http://localhost:3000/api/refresh-token", {
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
