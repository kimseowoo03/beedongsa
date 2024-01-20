import { ProfileInfoCard } from "@/components/Molecules/ProfileInfoCard";
import type { ClientUser } from "@/types/user";

interface ProfileClientHeader {
  userData: ClientUser;
}
export const ProfileClientHeader = ({ userData }: ProfileClientHeader) => {
  return (
    <ProfileInfoCard>
      <ProfileInfoCard.Photo>사진</ProfileInfoCard.Photo>
      <ProfileInfoCard.Name>회사이름</ProfileInfoCard.Name>
      <ProfileInfoCard.MoreInfo>회사 이메일</ProfileInfoCard.MoreInfo>
      <ProfileInfoCard.MoreInfo>클라이언트</ProfileInfoCard.MoreInfo>
      <ProfileInfoCard.MoreInfo>
        담당자명 / 담당자전화번호 / 담당자이메일
      </ProfileInfoCard.MoreInfo>
    </ProfileInfoCard>
  );
};
