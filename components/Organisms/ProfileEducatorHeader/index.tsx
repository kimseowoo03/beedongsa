import { ProfileInfoCard } from "@/components/Molecules/ProfileInfoCard";
import type { EducatorUser } from "@/types/user";

interface ProfileEducatorHeaderProps {
  userData: EducatorUser;
}
export const ProfileEducatorHeader = ({
  userData,
}: ProfileEducatorHeaderProps) => {
  return (
    <ProfileInfoCard>
      <ProfileInfoCard.Photo>사진</ProfileInfoCard.Photo>
      <ProfileInfoCard.Name>강사 이름</ProfileInfoCard.Name>
      <ProfileInfoCard.MoreInfo>개인 이메일</ProfileInfoCard.MoreInfo>
      <ProfileInfoCard.MoreInfo>[강사, 컨설턴트]</ProfileInfoCard.MoreInfo>
      <ProfileInfoCard.MoreInfo>경력: 2년차</ProfileInfoCard.MoreInfo>
    </ProfileInfoCard>
  );
};
