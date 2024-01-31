/**next */
import { redirect } from "next/navigation";

/**components */
import TemporaryStoragePage from "./page.client";

/**utils,  services, config*/
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import { transformFirestoreArrayDocuments } from "@/utils/transformFirestoreArrayDocuments";
import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";

/**type */
import type { Announcement } from "@/types/announcement";

async function getUserType({
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
    //TODO: 전체 다 불러오는 것은 비효율적 나중에 개선필요
    const userType = await userDocument.fields.type.stringValue;

    return userType;
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
}

interface ProfileDataArray {
  document?: {}; // document가 옵셔널 필드임을 나타냄
  readTime: string;
}
async function getQueryTemporarystorageData({
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
                value: { booleanValue: true },
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

export default async function Page() {
  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  //비회원인경우 홈으로 이동
  if (!idToken) {
    redirect("/");
  }

  const userType = await getUserType({ idToken, email });

  const collectionId: "Announcements" | "Lectures" =
    userType === "client" ? "Announcements" : "Lectures";

  const TemporaryStorageDataArray = await getQueryTemporarystorageData({
    collectionId,
    idToken,
    email,
  });

  const TemporaryStorageDatas = TemporaryStorageDataArray[0].document
    ? transformFirestoreArrayDocuments<Announcement>(TemporaryStorageDataArray)
    : [];

  return (
    <AuthHydrateAtoms email={email} idToken={idToken}>
      <TemporaryStoragePage TemporaryStorageDatas={TemporaryStorageDatas} />
    </AuthHydrateAtoms>
  );
}
