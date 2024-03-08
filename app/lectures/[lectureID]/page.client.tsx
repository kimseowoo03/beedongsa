"use client";

import { useQuery } from "@tanstack/react-query";

import { LectureDetail } from "@/components/Templates/Lecture/[lectureID]";

import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";

import type { Lecture } from "@/types/lecture";
import type { FirebaseDocument } from "@/types/firebaseType";

interface getQueryLectureDataProps {
  lectureID: string;
}
async function getQueryLectureData({
  lectureID,
}: getQueryLectureDataProps): Promise<FirebaseDocument> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Lectures/${lectureID}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    const lectureData = await response.json();

    return lectureData;
  } catch (error) {
    console.error("Error fetching lectureData:", error);
    return null;
  }
}

interface LectureDetailPageProps {
  lectureID: string;
}
export default function LectureDetailPage({
  lectureID,
}: LectureDetailPageProps) {
  //쿼리 강의 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: [`lecture_${lectureID}`],
    queryFn: () => getQueryLectureData({ lectureID }),
    refetchOnWindowFocus: false,
  });
  console.log(lectureID, data, "<<");

  const lectureData =
    !isLoading && data && transformFirestoreDocument<Lecture>(data.fields);

  return (
    <LectureDetail
      lectureID={lectureID}
      lectureData={lectureData}
      isLoading={isLoading}
    />
  );
}
