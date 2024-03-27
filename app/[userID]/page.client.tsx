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
import type { Apply } from "@/types/apply";

function useQueryData<T>(
  collectionId: string,
  fieldPath: string,
  value: string
) {
  const { data, isLoading, isSuccess, refetch } = useSomeDataQuery({
    collectionId,
    fieldPath,
    value,
  });

  const queryData = useMemo(() => {
    if (isSuccess) {
      return transformFirestoreQueryDocuments<T>(data);
    }
  }, [data, isSuccess]);

  return { data: queryData, isLoading, refetch };
}

interface ProfilePageProps {
  userData: EducatorUser | ClientUser;
  ProfileDatas: AnnouncementDatasType[] | LectureDatasType[];
}
export default function ProfilePage({
  userData,
  ProfileDatas,
}: ProfilePageProps) {
  const [{ userID, type }] = useAtom(userAtom);

  const outgoingInquiriesQuery = useQueryData<Inquiries>(
    "Inquiries",
    "questionerId",
    userID
  );
  const receivingInquiriesQuery = useQueryData<Inquiries>(
    "Inquiries",
    "responderId",
    userID
  );

  const applyQuery = useQueryData<Apply>(
    "Apply",
    type === "client" ? "clientID" : "educatorID",
    userID
  );

  const applicantQuery = useQueryData<Apply>("Apply", "clientID", userID);

  return (
    <Profile
      userData={userData}
      ProfileDatas={ProfileDatas}
      outgoingInquiriesQuery={outgoingInquiriesQuery}
      receivingInquiriesQuery={receivingInquiriesQuery}
      applyQuery={applyQuery}
      applicantQuery={applicantQuery}
    />
  );
}
