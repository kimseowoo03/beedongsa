import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import LectureEditPage from "./page.client";
import type { Lecture } from "@/types/lecture";

async function getQueryLectureData({
  idToken,
  lectureID,
}: {
  idToken: string;
  lectureID: string;
}) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Lectures/${lectureID}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const lectureData = await response.json();

    return lectureData;
  } catch (error) {
    console.error("Error fetching announcement document:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { lectureID } = params;

  const { idToken, email } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  const { fields } = await getQueryLectureData({
    idToken,
    lectureID,
  });
  console.log(fields, "<<<<fields");
  const lectureData = transformFirestoreDocument<Lecture>(fields);

  console.log(lectureData, "<<<announcementID");

  return (
    <AuthHydrateAtoms email={email} idToken={idToken}>
      <LectureEditPage lectureID={lectureID} lectureData={lectureData} />
    </AuthHydrateAtoms>
  );
}
