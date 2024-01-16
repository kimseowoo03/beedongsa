import { redirect } from "next/navigation";
import { refreshTokenFetch } from "@/services/refreshTokenFetch";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { idToken: newIDToken } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };
  //회원인경우 홈으로 이동
  if (newIDToken) {
    redirect("/");
  }

  return <>{children}</>;
}
