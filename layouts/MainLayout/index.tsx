"use client";
import { usePathname } from "next/navigation";

import Header from "@/components/Organisms/Header";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const [{ email, userID }] = useAtom(userAtom);

  const isActionHeader =
    pathname.startsWith(`/${userID}/client/announcement-create`) ||
    pathname.startsWith(`/${userID}/client/announcement-edit`) ||
    pathname.startsWith(`/${userID}/educator/lecture-create`) ||
    pathname.startsWith(`/${userID}/temporarystorage`);

  return (
    <>
      {!isActionHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
