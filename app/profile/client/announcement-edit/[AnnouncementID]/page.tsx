import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AnnouncementCreatePage from "./page.client";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";

export default async function Page() {
  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  //TODO: 공고 사전 데이터 불러오기
  //비회원인경우 홈으로 이동
  // if (!newIDToken) {
  //   redirect("/");
  // }

  return (
    <AuthHydrateAtoms email={email} idToken={idToken}>
      <AnnouncementCreatePage />
    </AuthHydrateAtoms>
  );
}
