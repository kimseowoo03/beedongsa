"use client";
import { usePathname } from "next/navigation";

import Header from "@/components/Organisms/Header";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const isActionHeader =
    pathname.startsWith("/profile/client/announcement-create") ||
    pathname.startsWith("/profile/client/announcement-edit") ||
    pathname.startsWith("/profile/educator/lecture-create") ||
    pathname.startsWith("/profile/temporarystorage");

  return (
    <>
      {!isActionHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
