import { Profile } from "@/components/Templates/Profile";
import type { ProfileDatasType } from "@/types/profile";
import type { ClientUser, EducatorUser } from "@/types/user";

interface ProfilePageProps {
  userData: EducatorUser | ClientUser;
  ProfileDatas: ProfileDatasType[];
}
export default function ProfilePage({
  userData,
  ProfileDatas,
}: ProfilePageProps) {
  return <Profile userData={userData} ProfileDatas={ProfileDatas} />;
}
