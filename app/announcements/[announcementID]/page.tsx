import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import AnnouncementDetailPage from "./page.client";
import { getBasicUserData } from "@/utils/userData";
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import type { ClientUser, EducatorUser } from "@/types/user";

export default async function Page({ params }) {
  const { announcementID } = params;

  const { idToken, email, name } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  let type = undefined;
  let userID = email ? email.split("@")[0] : null;

  if (idToken) {
    const { fields } = await getBasicUserData({ idToken, userID });

    type = transformFirestoreDocument<EducatorUser | ClientUser>(fields).type;
  }

  return (
    <AuthHydrateAtoms email={email} idToken={idToken} name={name} type={type}>
      <AnnouncementDetailPage announcementID={announcementID} />
    </AuthHydrateAtoms>
  );
}
