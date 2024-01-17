import { ProfileBasicInfo } from "@/components/Organisms/ProfileBasicInfo";

export const ProfileEducator = () => {
  return (
    <ProfileBasicInfo>
      <ProfileBasicInfo.Photo>사진</ProfileBasicInfo.Photo>
      <ProfileBasicInfo.Name>강사 이름</ProfileBasicInfo.Name>
      <ProfileBasicInfo.MoreInfo>개인 이메일</ProfileBasicInfo.MoreInfo>
      <ProfileBasicInfo.MoreInfo>[강사, 컨설턴트]</ProfileBasicInfo.MoreInfo>
      <ProfileBasicInfo.MoreInfo>경력: 2년차</ProfileBasicInfo.MoreInfo>
    </ProfileBasicInfo>
  );
};
