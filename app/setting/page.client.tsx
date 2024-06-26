"use client";
import { ProfileSetting } from "@/components/Templates/Setting";
import type { ClientUser, EducatorUser } from "@/types/user";

interface ProfileSettingPageProps {
  userData: EducatorUser | ClientUser;
}
export default function ProfileSettingPage({
  userData,
}: ProfileSettingPageProps) {
  return <ProfileSetting userData={userData} />;
}
