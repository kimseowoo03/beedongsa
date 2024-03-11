import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import AnnouncementDetailPage from "./page.client";

export default async function Page({ params }) {
  const { announcementID } = params;

  const { idToken, email, name, userID } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  return (
    <AuthHydrateAtoms email={email} idToken={idToken} name={name}>
      <AnnouncementDetailPage announcementID={announcementID} />
    </AuthHydrateAtoms>
  );
}
