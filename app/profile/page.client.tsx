import { Profile } from "@/components/Templates/Profile";
import type { ClientUser, EducatorUser } from "@/types/user";

interface ProfilePageProps {
  userData: EducatorUser | ClientUser;
}
export default function ProfilePage({ userData }: ProfilePageProps) {
  return <Profile userData={userData} />;
}
