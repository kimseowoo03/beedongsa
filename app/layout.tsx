import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { cookies } from "next/headers";

import "./globals.css";

import ReactQueryConfigs from "@/configs/ReactQueryConfigs";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import JotaiConfigs from "@/configs/JotaiConfigs";

import Header from "@/components/layout/Header";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beedongsa",
  description: "비동사 프로젝트",
};

async function refreshTokenFetch() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken").value;

    if (!refreshToken) {
      // 리프레시 토큰이 없는 경우
      return null;
    }

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { idToken: newIDToken } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  return (
    <html lang="en">
      <body className={notoSansKR.className}>
        <ReactQueryConfigs>
          <JotaiConfigs>
            <AuthHydrateAtoms newIDToken={newIDToken}>
              <Header />
              {children}
            </AuthHydrateAtoms>
          </JotaiConfigs>
        </ReactQueryConfigs>
      </body>
    </html>
  );
}
