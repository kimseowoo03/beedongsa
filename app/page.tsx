import { refreshTokenFetch } from "@/services/refreshTokenFetch";

import HomePage from "./page.client";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";

export default async function Page() {
  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
    email: null,
  };

  return (
    <AuthHydrateAtoms email={email} idToken={idToken}>
      <HomePage />
    </AuthHydrateAtoms>
  );
}
