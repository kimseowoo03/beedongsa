"use client";
import { useMemo } from "react";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

import { Profile } from "@/components/Templates/[userID]";

import { useSomeDataQuery } from "@/hooks/useSomeDataQuery";

import { transformFirestoreQueryDocuments } from "@/utils/transformFirestoreQueryDocuments";

import type { Inquiries } from "@/types/inquiries";
import type { ClientUser, EducatorUser } from "@/types/user";
import type { AnnouncementDatasType, LectureDatasType } from "@/types/profile";

//TODO: 커스텀 훅 useSomeDataQuery 으로 나중에 옮기기
function useInquiriesData(
  collectionId: string,
  fieldPath: string,
  value: string
) {
  const { data, isLoading, isSuccess, refetch } = useSomeDataQuery({
    collectionId,
    fieldPath,
    value,
  });

  const inquiriesData = useMemo(() => {
    if (isSuccess) {
      return transformFirestoreQueryDocuments<Inquiries[]>(data);
    }
  }, [data, isSuccess]);

  return { data: inquiriesData, isLoading, refetch };
}

interface ProfilePageProps {
  userData: EducatorUser | ClientUser;
  ProfileDatas: AnnouncementDatasType[] | LectureDatasType[];
}
export default function ProfilePage({
  userData,
  ProfileDatas,
}: ProfilePageProps) {
  const [{ userID }] = useAtom(userAtom);

  const outgoingInquiriesQuery = useInquiriesData(
    "Inquiries",
    "questionerId",
    userID
  );
  const receivingInquiriesQuery = useInquiriesData(
    "Inquiries",
    "responderId",
    userID
  );

  return (
    <Profile
      userData={userData}
      ProfileDatas={ProfileDatas}
      outgoingInquiriesQuery={outgoingInquiriesQuery}
      receivingInquiriesQuery={receivingInquiriesQuery}
    />
  );
}
