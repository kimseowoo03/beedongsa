import ReactQueryConfigs from "@/configs/ReactQueryConfigs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ReactQueryConfigs> {children}</ReactQueryConfigs>
      </body>
    </html>
  );
}
