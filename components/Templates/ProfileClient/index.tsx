import { ProfileBasicInfo } from "@/components/Organisms/ProfileBasicInfo";

export const ProfileClient = () => {
  return (
    <ProfileBasicInfo>
      <ProfileBasicInfo.Photo>사진</ProfileBasicInfo.Photo>
      <ProfileBasicInfo.Name>회사이름</ProfileBasicInfo.Name>
      <ProfileBasicInfo.MoreInfo>회사 이메일</ProfileBasicInfo.MoreInfo>
      <ProfileBasicInfo.MoreInfo>클라이언트</ProfileBasicInfo.MoreInfo>
      <ProfileBasicInfo.MoreInfo>
        담당자명 / 담당자전화번호 / 담당자이메일
      </ProfileBasicInfo.MoreInfo>
    </ProfileBasicInfo>
  );
};
