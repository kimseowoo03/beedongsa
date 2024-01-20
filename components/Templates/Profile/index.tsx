import NoticeBar from "@/components/Atoms/ NoticeBar";
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
      <NoticeBar>
        모든 강사님들께서 올려주시는 자격사항은 비동사 전담매니저의 확인을 거친
        후 검증된 강사님의 프로필만 업로드됩니다.
      </NoticeBar>
    </>
  );
};
