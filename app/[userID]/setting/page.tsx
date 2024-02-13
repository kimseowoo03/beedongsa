import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import ProfileEditPage from "./page.client";
import { redirect } from "next/navigation";
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import { ClientUser, EducatorUser } from "@/types/user";

async function getBasicUserData({
  idToken,
  email,
}: {
  idToken: string;
  email: string;
}) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Users/${email}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const userDocument = await response.json();

    return userDocument;
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
}

export default async function Page() {
  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  // 비회원인경우 홈으로 이동
  if (!idToken) {
    redirect("/");
  }

  const { fields } = await getBasicUserData({ idToken, email });

  const userData = transformFirestoreDocument<EducatorUser | ClientUser>(
    fields
  );

  return (
    <AuthHydrateAtoms email={email} idToken={idToken}>
      <ProfileEditPage userData={userData} />
    </AuthHydrateAtoms>
  );
}
