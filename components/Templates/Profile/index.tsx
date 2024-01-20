import { ProfileClientHeader } from "@/components/Organisms/ProfileClientHeader";
import { ProfileEducatorHeader } from "@/components/Organisms/ProfileEducatorHeader";
import type { ClientUser, EducatorUser } from "@/types/user";

interface ProfileProps {
  userData: EducatorUser | ClientUser;
}
export const Profile = ({ userData }: ProfileProps) => {
  const { type } = userData;
  return (
    <>
      {type === "client" && <ProfileClientHeader userData={userData} />}
      {type === "educator" && <ProfileEducatorHeader userData={userData} />}
    </>
  );
};
