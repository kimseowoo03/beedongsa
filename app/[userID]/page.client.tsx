import { Profile } from "@/components/Templates/[userID]";
import type { AnnouncementDatasType, LectureDatasType } from "@/types/profile";
import type { ClientUser, EducatorUser } from "@/types/user";

interface ProfilePageProps {
  userData: EducatorUser | ClientUser;
  ProfileDatas: AnnouncementDatasType[] | LectureDatasType[];
}
export default function ProfilePage({
  userData,
  ProfileDatas,
}: ProfilePageProps) {
  return <Profile userData={userData} ProfileDatas={ProfileDatas} />;
}
