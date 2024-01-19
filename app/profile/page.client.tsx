import { ProfileClient } from "@/components/Templates/ProfileClient";
import { ProfileEducator } from "@/components/Templates/ProfileEducator";
import type { ClientUser, EducatorUser } from "@/types/user";

//TODO: 선택 유형에따라 보여주는 화면 다르게 작업
interface ProfilePageProps {
  userData: EducatorUser | ClientUser;
}
export default function ProfilePage({ userData }: ProfilePageProps) {
  return (
    <div>
      <ProfileEducator />
      <ProfileClient />
    </div>
  );
}
