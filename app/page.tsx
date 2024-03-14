import { refreshTokenFetch } from "@/services/refreshTokenFetch";

import HomePage from "./page.client";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";

import { getBasicUserData } from "@/utils/userData";
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import type { ClientUser, EducatorUser } from "@/types/user";

export default async function Page() {
  const { idToken, email, name } = (await refreshTokenFetch()) ?? {
    idToken: null,
    email: null,
    name: null,
  };

  const userID = email.split("@")[0];
  const { fields } = await getBasicUserData({ idToken, userID });

  const { type } = transformFirestoreDocument<EducatorUser | ClientUser>(
    fields
  );

  return (
    <AuthHydrateAtoms email={email} idToken={idToken} name={name} type={type}>
      <HomePage />
    </AuthHydrateAtoms>
  );
}
