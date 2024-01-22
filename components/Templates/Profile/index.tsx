"use client";
import { useState } from "react";

import { ProfileClientHeader } from "@/components/Organisms/ProfileClientHeader";
import { ProfileEducatorHeader } from "@/components/Organisms/ProfileEducatorHeader";
import NoticeBar from "@/components/Atoms/ NoticeBar";
import Tab from "@/components/Molecules/Tab";
import AnnouncementList from "@/components/Organisms/AnnouncementList";

import type { ClientUser, EducatorUser } from "@/types/user";

interface ProfileProps {
  userData: EducatorUser | ClientUser;
}
export const Profile = ({ userData }: ProfileProps) => {
  const { type } = userData;
  const [activeTab, setActiveTab] = useState("공고목록");
  const tabTitles = ["공고목록", "지원관리"];

  return (
    <>
      {type === "client" && (
        <>
          <ProfileClientHeader userData={userData} />
          <NoticeBar>
            모든 강사님들께서 올려주시는 자격사항은 비동사 전담매니저의 확인을
            거친 후 검증된 강사님의 프로필만 업로드됩니다.
          </NoticeBar>
          <Tab
            tabTitles={tabTitles}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {activeTab === "공고목록" && <AnnouncementList />}
        </>
      )}

      {type === "educator" && (
        <>
          <ProfileEducatorHeader userData={userData} />
          <NoticeBar>
            모든 강사님들께서 올려주시는 자격사항은 비동사 전담매니저의 확인을
            거친 후 검증된 강사님의 프로필만 업로드됩니다.
          </NoticeBar>
        </>
      )}
    </>
  );
};
