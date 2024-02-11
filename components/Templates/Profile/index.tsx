"use client";
import Link from "next/link";

import { ProfileClientHeader } from "@/components/Organisms/ProfileClientHeader";
import { ProfileEducatorHeader } from "@/components/Organisms/ProfileEducatorHeader";
import NoticeBar from "@/components/Atoms/NoticeBar";
import AnnouncementList from "@/components/Organisms/AnnouncementList";
import Button from "@/components/Atoms/Button";
import { Tabs } from "@/components/Molecules/Tabs";

import type { ClientUser, EducatorUser } from "@/types/user";
import type {
  ProfileAnnouncementDatasType,
  ProfileLectureDatasType,
} from "@/types/profile";
import LectureList from "@/components/Organisms/LectureList";

interface ProfileProps {
  userData: EducatorUser | ClientUser;
  ProfileDatas: ProfileAnnouncementDatasType[] | ProfileLectureDatasType[];
}
export const Profile = ({ userData, ProfileDatas }: ProfileProps) => {
  const { type } = userData;

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
              <Tabs.Trigger value="공고목록" text="공고목록" />
              <Tabs.Trigger value="지원관리" text="지원관리" />
            </Tabs.List>
            <Tabs.Panel value="공고목록">
              {ProfileDatas.map((ProfileData) => {
                return (
                  <AnnouncementList
                    key={ProfileData.id}
                    ProfileData={ProfileData}
                  />
                );
              })}
            </Tabs.Panel>
            <Tabs.Panel value="지원관리">
              <div>지원관리</div>
            </Tabs.Panel>
          </Tabs>
          <Link href="/profile/client/announcement-create">
            임시 공고 등록 버튼
          </Link>
        </>
      )}

      {type === "educator" && (
        <>
          <ProfileEducatorHeader userData={userData} />
          <NoticeBar>
            모든 강사님들께서 올려주시는 자격사항은 비동사 전담매니저의 확인을
            거친 후 검증된 강사님의 프로필만 업로드됩니다.
          </NoticeBar>
          <Tabs defaultValue="강의목록">
            <Tabs.List>
              <Tabs.Trigger value="상세정보" text="상세정보" />
              <Tabs.Trigger value="강의목록" text="강의목록" />
            </Tabs.List>
            <Tabs.Panel value="상세정보">
              <div>상세정보</div>
            </Tabs.Panel>
            <Tabs.Panel value="강의목록">
              {ProfileDatas.map((ProfileData) => {
                return (
                  <LectureList key={ProfileData.id} ProfileData={ProfileData} />
                );
              })}
            </Tabs.Panel>
          </Tabs>
          <Link href="/profile/educator/lecture-create">
            임시 강의 등록 버튼
          </Link>
        </>
      )}
    </>
  );
};
