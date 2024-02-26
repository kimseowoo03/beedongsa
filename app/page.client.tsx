"use client";
import { Home } from "@/components/Templates/Home";
import { transformFirestoreArrayDocuments } from "@/utils/transformFirestoreArrayDocuments";
import { transformFirestoreQueryDocuments } from "@/utils/transformFirestoreQueryDocuments";
import { useQueries } from "@tanstack/react-query";

async function getAnnouncementsData() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Announcements`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    const announcementsData = await response.json();

    console.log(announcementsData, "데이터 입니다");
    return announcementsData;
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
}

async function getApprovedLecturesData() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  // runQuery 엔드포인트를 사용합니다.
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents:runQuery`;

  const query = {
    structuredQuery: {
      from: [{ collectionId: "Lectures" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "administratorApproval" },
          op: "EQUAL",
          value: { booleanValue: true },
        },
      },
      // 결과를 필요에 따라 정렬하거나 제한할 수 있습니다.
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(query),
      headers: { "Content-Type": "application/json" },
    });
    const lecturesData = await response.json();

    // Firestore의 응답 구조에 따라 데이터를 추출하고 변환할 수 있습니다.
    // 이 부분에서 필요한 데이터 처리를 추가하세요.

    return lecturesData;
  } catch (error) {
    console.error("Error fetching approved lectures:", error);
    return null;
  }
}

export default function HomePage() {
  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["announcements"],
        queryFn: getAnnouncementsData,
      },
      {
        queryKey: ["approvedLectures"],
        queryFn: getApprovedLecturesData,
      },
    ],
  });

  // 로딩 상태와 성공 상태 확인
  const isLoading = queryResults.some((query) => query.isLoading);
  const isAllSuccess = queryResults.every((query) => query.isSuccess);

  // 데이터 변환 로직
  let announcements = [];
  let approvedLectures = [];
  if (isAllSuccess) {
    announcements = transformFirestoreArrayDocuments(queryResults[0].data);
    approvedLectures = transformFirestoreQueryDocuments(queryResults[1].data);
  }

  return (
    <Home data={{ announcements, approvedLectures }} isLoading={isLoading} />
  );
}
