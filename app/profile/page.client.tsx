import { Profile } from "@/components/Templates/Profile";
import type { ProfileAnnouncementDatasType } from "@/types/profile";
import type { ClientUser, EducatorUser } from "@/types/user";

interface ProfilePageProps {
  userData: EducatorUser | ClientUser;
  ProfileDatas: ProfileAnnouncementDatasType[];
}
export default function ProfilePage({
  userData,
  ProfileDatas,
}: ProfilePageProps) {
  return <Profile userData={userData} ProfileDatas={ProfileDatas} />;
}
