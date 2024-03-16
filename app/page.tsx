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

  let type = null;
  // 로그인한 유저인 경우에 실행할 로직
  if (idToken) {
    const userID = email.split("@")[0];
    const { fields } = await getBasicUserData({ idToken, userID });

    const transformedData = transformFirestoreDocument<
      EducatorUser | ClientUser
    >(fields);
    type = transformedData.type;
  }

  return (
    <AuthHydrateAtoms email={email} idToken={idToken} name={name} type={type}>
      <HomePage />
    </AuthHydrateAtoms>
  );
}
