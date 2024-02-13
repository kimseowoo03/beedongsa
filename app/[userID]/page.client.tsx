import { Profile } from "@/components/Templates/[userID]";
import type {
  ProfileAnnouncementDatasType,
  ProfileLectureDatasType,
} from "@/types/profile";
import type { ClientUser, EducatorUser } from "@/types/user";

interface ProfilePageProps {
  userData: EducatorUser | ClientUser;
  ProfileDatas: ProfileAnnouncementDatasType[] | ProfileLectureDatasType[];
}
export default function ProfilePage({
  userData,
  ProfileDatas,
}: ProfilePageProps) {
  return <Profile userData={userData} ProfileDatas={ProfileDatas} />;
}
