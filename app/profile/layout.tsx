import { redirect } from "next/navigation";
import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import type { ClientUser, EducatorUser } from "@/types/user";

async function getBasicUserData({
  idToken,
  email,
}: {
  idToken: string;
  email: string;
}) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const documentId = encodeURIComponent(email); // URL에 사용하기 위해 인코딩
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Users/${documentId}`;

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  //비회원인경우 홈으로 이동
  // if (!newIDToken) {
  //   redirect("/");
  // }

  const { fields } = await getBasicUserData({ idToken, email });

  const data = transformFirestoreDocument<EducatorUser | ClientUser>(fields);
  console.log(data, "<<<<<<<<<<<<<<<<<fetched data");

  return <>{children}</>;
}
