"use client";

import { useQuery } from "@tanstack/react-query";

import { AnnouncementDetail } from "@/components/Templates/Announcements/[announcementID]";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { applyModalAtom } from "@/atoms/apply";

import { transformFirestoreQueryDocuments } from "@/utils/transformFirestoreQueryDocuments";
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";

import type { Lecture } from "@/types/lecture";
import type { FirebaseDocument } from "@/types/firebaseType";
import type { Announcement } from "@/types/announcement";

interface ProfileDataArray {
  document: FirebaseDocument;
}
async function getQueryProfileData({
  idToken,
  email,
}: {
  idToken: string;
  email: string;
}): Promise<ProfileDataArray[]> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents:runQuery`;
  //해당 이메일과 승인된 강의만
  const query = {
    structuredQuery: {
      from: [{ collectionId: "Lectures" }],
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
                field: { fieldPath: "administratorApproval" },
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
  const [{ idToken, email }] = useAtom(userAtom);
  const [isApplyModalOpen, setIsApplyModalOpen] = useAtom(applyModalAtom);

  //쿼리 공고 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: [`announcement_${announcementID}`],
    queryFn: () => getQueryAnnouncementData({ announcementID }),
    refetchOnWindowFocus: false,
  });

  const announcementData =
    !isLoading && data && transformFirestoreDocument<Announcement>(data.fields);

  //지원하기 눌렀을 때 호출하는 유저(강사인경우)의 강의 정보들
  const {
    data: profileDataDocuments,
    isLoading: isProfileDataLoading,
    error: profileDataError,
  } = useQuery({
    queryKey: ["profileData"],
    queryFn: () => getQueryProfileData({ idToken, email }),
    enabled: isApplyModalOpen,
    refetchOnWindowFocus: false,
  });

  const ProfileDatas =
    !isProfileDataLoading &&
    profileDataDocuments &&
    transformFirestoreQueryDocuments<Lecture>(profileDataDocuments);

  return (
    <AnnouncementDetail
      announcementID={announcementID}
      announcementData={announcementData}
      isLoading={isLoading}
      ProfileDatas={ProfileDatas}
    />
  );
}
