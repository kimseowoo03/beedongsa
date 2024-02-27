import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import AnnouncementDetailPage from "./page.client";

export default async function Page({ params }) {
  const { announcementID } = params;

  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  return (
    <AuthHydrateAtoms email={email} idToken={idToken}>
      <AnnouncementDetailPage announcementID={announcementID} />
    </AuthHydrateAtoms>
  );
}
