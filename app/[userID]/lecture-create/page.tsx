import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import LectureCreatePage from "./page.client";
import { redirect } from "next/navigation";

export default async function Page() {
  const { idToken, email, name } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  //비회원인경우 홈으로 이동
  if (!idToken) {
    redirect("/");
  }

  return (
    <AuthHydrateAtoms email={email} idToken={idToken} name={name}>
      <LectureCreatePage />
    </AuthHydrateAtoms>
  );
}
