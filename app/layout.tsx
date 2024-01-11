import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import ReactQueryConfigs from "@/configs/ReactQueryConfigs";

import Header from "@/components/layout/Header";

import "./globals.css";
import AuthManager from "@/configs/AuthConfigs";
import { cookies } from "next/headers";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beedongsa",
  description: "비동사 프로젝트",
};

async function fetchData() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken").value;
    console.log("--------------------------------------------------------");
    console.log("re>>>>>>", refreshToken);
    console.log("--------------------------------------------------------");

    if (!refreshToken) {
      // 리프레시 토큰이 없는 경우
      return null;
    }

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchData();
  console.log(data, "<<<<fetch Data");

  return (
    <html lang="en">
      <body className={notoSansKR.className}>
        <ReactQueryConfigs>
          <Header />
          {children}
        </ReactQueryConfigs>
      </body>
    </html>
  );
}
