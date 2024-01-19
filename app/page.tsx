import { refreshTokenFetch } from "@/services/refreshTokenFetch";

import HomePage from "./page.client";

export default async function Page() {
  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  return <HomePage />;
}
