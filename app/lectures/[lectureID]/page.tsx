import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import LectureDetailPage from "./page.client";

export default async function Page({ params }) {
  const { lectureID } = params;

  const { idToken, email, name } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  return (
    <AuthHydrateAtoms email={email} idToken={idToken} name={name}>
      <LectureDetailPage lectureID={lectureID} />
    </AuthHydrateAtoms>
  );
}
