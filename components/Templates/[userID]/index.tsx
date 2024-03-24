import Link from "next/link";

import { ProfileClientHeader } from "@/components/Organisms/ProfileClientHeader";
import { ProfileEducatorHeader } from "@/components/Organisms/ProfileEducatorHeader";
import NoticeBar from "@/components/Atoms/NoticeBar";
import AnnouncementList from "@/components/Organisms/AnnouncementList";
import { Tabs } from "@/components/Molecules/Tabs";
import LectureList from "@/components/Organisms/LectureList";
import ProfileDetailInfo from "@/components/Organisms/ProfileDetailInfo";
import InquiriesList from "@/components/Organisms/InquiriesList";
import { ApplyList } from "@/components/Organisms/ApplyList";
import { ApplyStatusModal } from "@/components/Organisms/ApplyStatusModal";

import { ListHeader, ListHeaderActions } from "@/styles/List";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

import type { InquiriesQuery } from "@/types/inquiries";
import type { ClientUser, EducatorUser } from "@/types/user";
import type { AnnouncementDatasType, LectureDatasType } from "@/types/profile";
import type { ApplyQuery } from "@/types/apply";

interface ProfileProps {
  userData: EducatorUser | ClientUser;
  ProfileDatas: AnnouncementDatasType[] | LectureDatasType[];
  outgoingInquiriesQuery: InquiriesQuery;
  receivingInquiriesQuery: InquiriesQuery;
  applyQuery: ApplyQuery | null;
}
export const Profile = ({
  userData,
  ProfileDatas,
  outgoingInquiriesQuery,
  receivingInquiriesQuery,
  applyQuery,
}: ProfileProps) => {
  const { type } = userData;
  const [{ userID, email, idToken }] = useAtom(userAtom);

  console.log(applyQuery, "<<<<<applyQuery");
  return (
    <>
      {type === "client" && (
        <>
          <ProfileClientHeader userData={userData} />
          <NoticeBar>
            모든 강사님들께서 올려주시는 자격사항은 비동사 전담매니저의 확인을
            거친 후 검증된 강사님의 프로필만 업로드됩니다.
          </NoticeBar>
          <Tabs defaultValue="공고목록">
            <Tabs.List>
              <Tabs.Trigger value="공고목록" />
              <Tabs.Trigger value="문의내역" />
            </Tabs.List>
            <Tabs.Panel value="공고목록">
              <Link href={`/${userID}/announcement-create`}>
                임시 공고 등록 버튼
              </Link>
              {ProfileDatas &&
                ProfileDatas.map((ProfileData) => {
                  return (
                    <AnnouncementList
                      key={ProfileData.id}
                      ProfileData={ProfileData}
                    />
                  );
                })}
            </Tabs.Panel>
            <Tabs.Panel value="문의내역">
              <InquiriesList
                outgoingInquiriesQuery={outgoingInquiriesQuery}
                receivingInquiriesQuery={receivingInquiriesQuery}
              />
            </Tabs.Panel>
          </Tabs>
        </>
      )}

      {type === "educator" && (
        <>
          <ProfileEducatorHeader userData={userData} />
          <NoticeBar>
            모든 강사님들께서 올려주시는 자격사항은 비동사 전담매니저의 확인을
            거친 후 검증된 강사님의 프로필만 업로드됩니다.
          </NoticeBar>
          <Tabs defaultValue="상세정보">
            <Tabs.List>
              <Tabs.Trigger value="상세정보" />
              <Tabs.Trigger value="강의목록" />
              <Tabs.Trigger value="문의내역" />
              <Tabs.Trigger value="지원내역" />
            </Tabs.List>
            <Tabs.Panel value="상세정보">
              <ListHeader>
                <h2>상세정보</h2>
                <Link href={`/setting`}>편집</Link>
              </ListHeader>
              <ProfileDetailInfo userData={userData} />
            </Tabs.Panel>
            <Tabs.Panel value="강의목록">
              <ListHeader>
                <h2>강의 목록</h2>
                <ListHeaderActions>
                  <Link href={`/${userID}/temporarystorage`}>임시저장목록</Link>
                  <Link href={`/${userID}/lecture-create`}>추가</Link>
                </ListHeaderActions>
              </ListHeader>
              {ProfileDatas &&
                ProfileDatas.map((ProfileData) => {
                  return (
                    <LectureList
                      key={ProfileData.id}
                      ProfileData={ProfileData}
                    />
                  );
                })}
            </Tabs.Panel>
            <Tabs.Panel value="문의내역">
              <InquiriesList
                outgoingInquiriesQuery={outgoingInquiriesQuery}
                receivingInquiriesQuery={receivingInquiriesQuery}
              />
            </Tabs.Panel>
            <Tabs.Panel value="지원내역">
              <ApplyList {...applyQuery} />
            </Tabs.Panel>
          </Tabs>
        </>
      )}

      <ApplyStatusModal />
    </>
  );
};
