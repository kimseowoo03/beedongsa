"use client";

import { AnnouncementDetail } from "@/components/Templates/Announcements/[announcementID]";

import { Announcement } from "@/types/announcement";
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";
import { useQuery } from "@tanstack/react-query";

import type { FirebaseDocument } from "@/types/firebaseType";

interface getQueryAnnouncementDataProps {
  announcementID: string;
}
async function getQueryAnnouncementData({
  announcementID,
}: getQueryAnnouncementDataProps): Promise<FirebaseDocument> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Announcements/${announcementID}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    const announcementData = await response.json();

    return announcementData;
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
}

interface AnnouncementDetailPageProps {
  announcementID: string;
}
export default function AnnouncementDetailPage({
  announcementID,
}: AnnouncementDetailPageProps) {
  //쿼리 공고 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: [`announcement_${announcementID}`],
    queryFn: () => getQueryAnnouncementData({ announcementID }),
    refetchOnWindowFocus: false,
  });

  const announcementData =
    !isLoading && data && transformFirestoreDocument<Announcement>(data.fields);

  return (
    <AnnouncementDetail
      announcementID={announcementID}
      announcementData={announcementData}
      isLoading={isLoading}
    />
  );
}
