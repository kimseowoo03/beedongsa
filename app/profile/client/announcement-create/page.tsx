import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AnnouncementCreatePage from "./page.client";

export default async function Page() {
  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  //비회원인경우 홈으로 이동
  // if (!newIDToken) {
  //   redirect("/");
  // }

  return <AnnouncementCreatePage />;
}