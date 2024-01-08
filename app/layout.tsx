import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import ReactQueryConfigs from "@/configs/ReactQueryConfigs";

import Header from "@/components/layout/Header";

import "./globals.css";
import AuthManager from "@/configs/AuthConfigs";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beedongsa",
  description: "비동사 프로젝트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSansKR.className}>
        <ReactQueryConfigs>
          <AuthManager />
          <Header />
          {children}
        </ReactQueryConfigs>
      </body>
    </html>
  );
}
