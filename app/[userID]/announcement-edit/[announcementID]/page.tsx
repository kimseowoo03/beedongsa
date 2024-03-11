import { refreshTokenFetch } from "@/services/refreshTokenFetch";
import AuthHydrateAtoms from "@/configs/AuthHydrateAtoms";
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import type { Announcement } from "@/types/announcement";
import AnnouncementEditPage from "./page.client";

async function getQueryAnnouncementData({
  idToken,
  announcementID,
}: {
  idToken: string;
  announcementID: string;
}) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Announcements/${announcementID}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const announcementData = await response.json();

    return announcementData;
  } catch (error) {
    console.error("Error fetching announcement document:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { announcementID } = params;

  const { idToken, email, name } = (await refreshTokenFetch()) ?? {
    idToken: null,
  };

  const { fields } = await getQueryAnnouncementData({
    idToken,
    announcementID,
  });
  console.log(fields, "<<<<fields");
  const announcementData = transformFirestoreDocument<Announcement>(fields);

  console.log(announcementID, "<<<announcementID");

  return (
    <AuthHydrateAtoms email={email} idToken={idToken} name={name}>
      <AnnouncementEditPage
        announcementID={announcementID}
        announcementData={announcementData}
      />
    </AuthHydrateAtoms>
  );
}
