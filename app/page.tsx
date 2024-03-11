import { refreshTokenFetch } from "@/services/refreshTokenFetch";

import HomePage from "./page.client";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";

export default async function Page() {
  const { idToken, email, name } = (await refreshTokenFetch()) ?? {
    idToken: null,
    email: null,
    name: null,
  };

  return (
    <AuthHydrateAtoms email={email} idToken={idToken} name={name}>
      <HomePage />
    </AuthHydrateAtoms>
  );
}
