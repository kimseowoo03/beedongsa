import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import "./globals.css";

import ReactQueryConfigs from "@/configs/ReactQueryConfigs";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import JotaiConfigs from "@/configs/JotaiConfigs";

import Header from "@/components/layout/Header";

import { refreshTokenFetch } from "@/services/refreshTokenFetch";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beedongsa",
  description: "비동사 프로젝트",
};

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
