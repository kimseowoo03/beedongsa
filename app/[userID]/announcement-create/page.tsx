import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AnnouncementCreatePage from "./page.client";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";

export default async function Page() {
  const { idToken, email, name } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  //비회원인경우 홈으로 이동
  // if (!newIDToken) {
  //   redirect("/");
  // }

  return (
    <AuthHydrateAtoms email={email} idToken={idToken} name={name}>
      <AnnouncementCreatePage />
    </AuthHydrateAtoms>
  );
}
