/**components */
import ProfilePage from "./page.client";

/**utils,  services*/
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import { transformFirestoreDocuments } from "@/utils/transformFirestoreArrayDocuments";
import { refreshTokenFetch } from "@/services/refreshTokenFetch";

/**type */
import type { ClientUser, EducatorUser } from "@/types/user";
import type { Announcement } from "@/types/announcement";

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

async function getQueryProfileData({
  collectionId,
  idToken,
  email,
}: {
  collectionId: "Announcements" | "Lectures";
  idToken: string;
  email: string;
}): Promise<[]> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents:runQuery`;
  const query = {
    structuredQuery: {
      from: [{ collectionId }],
      where: {
        fieldFilter: {
          field: { fieldPath: "registeredEmail" },
          op: "EQUAL",
          value: { stringValue: email },
        },
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
}

export default async function Page() {
  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  //비회원인경우 홈으로 이동
  // if (!newIDToken) {
  //   redirect("/");
  // }

  const { fields } = await getBasicUserData({ idToken, email });

  const userData = transformFirestoreDocument<EducatorUser | ClientUser>(
    fields
  );

  const collectionId: "Announcements" | "Lectures" =
    userData.type === "client" ? "Announcements" : "Lectures";

  const ProfileDataArray = await getQueryProfileData({
    collectionId,
    idToken,
    email,
  });

  const ProfileDatas =
    transformFirestoreDocuments<Announcement>(ProfileDataArray);

  console.log(ProfileDatas, "ProfileDatas");
  console.log("-------------page.tsx-----------");

  return <ProfilePage userData={userData} ProfileDatas={ProfileDatas} />;
}
