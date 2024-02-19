/**next */
import { redirect } from "next/navigation";

/**components */
import ProfilePage from "./page.client";

/**utils,  services, config*/
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import { transformFirestoreArrayDocuments } from "@/utils/transformFirestoreArrayDocuments";
import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";

/**type */
import type { ClientUser, EducatorUser } from "@/types/user";
import type { Announcement } from "@/types/announcement";

async function getBasicUserData({
  idToken,
  userID,
}: {
  idToken: string;
  userID: string;
}) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Users/${userID}`;

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

interface ProfileDataArray {
  document?: {}; // document가 옵셔널 필드임을 나타냄
  readTime: string;
}
async function getQueryProfileData({
  collectionId,
  idToken,
  email,
}: {
  collectionId: "Announcements" | "Lectures";
  idToken: string;
  email: string;
}): Promise<ProfileDataArray[]> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents:runQuery`;
  //해당 이메일과 임시저장이 이닌 조건
  const query = {
    structuredQuery: {
      from: [{ collectionId }],
      where: {
        compositeFilter: {
          op: "AND",
          filters: [
            {
              fieldFilter: {
                field: { fieldPath: "registeredEmail" },
                op: "EQUAL",
                value: { stringValue: email },
              },
            },
            {
              fieldFilter: {
                field: { fieldPath: "temporaryStorage" },
                op: "EQUAL",
                value: { booleanValue: false },
              },
            },
          ],
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

export default async function Page({ params }) {
  const { userID } = params;

  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  //TODO: 입력한 userID와 로그인한 유저 이메일 여부

  //비회원인경우 홈으로 이동
  if (!idToken) {
    redirect("/");
  }

  const { fields } = await getBasicUserData({ idToken, userID });

  console.log(fields, "<<<<<<<<<<< [userID] = fields");
  const userData = transformFirestoreDocument<EducatorUser | ClientUser>(
    fields ? fields : {}
  );

  const collectionId: "Announcements" | "Lectures" =
    userData.type === "client" ? "Announcements" : "Lectures";

  const ProfileDataArray = await getQueryProfileData({
    collectionId,
    idToken,
    email,
  });

  const ProfileDatas = ProfileDataArray[0].document
    ? transformFirestoreArrayDocuments<Announcement>(ProfileDataArray)
    : [];

  return (
    <AuthHydrateAtoms email={email} idToken={idToken}>
      <ProfilePage userData={userData} ProfileDatas={ProfileDatas} />
    </AuthHydrateAtoms>
  );
}