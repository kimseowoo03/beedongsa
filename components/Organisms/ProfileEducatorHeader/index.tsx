import { ProfileInfoCard } from "@/components/Molecules/ProfileInfoCard";
import type { EducatorUser } from "@/types/user";
import styled from "@emotion/styled";

const ProfileInfoInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface ProfileEducatorHeaderProps {
  userData: EducatorUser;
}
export const ProfileEducatorHeader = ({
  userData,
}: ProfileEducatorHeaderProps) => {
  const { name, email, phoneNumber, educatorType } = userData;
  return (
    <ProfileInfoCard>
      <ProfileInfoCard.Photo>{name.substring(0, 4)}</ProfileInfoCard.Photo>
      <ProfileInfoInfoWrap>
        <ProfileInfoCard.Name>{name}</ProfileInfoCard.Name>
        <div>
          <ProfileInfoCard.MoreInfo>
            {educatorType.map((item) => {
              return (
                <span key={item}>
                  {item === "lecture" ? "강사 " : "컨설턴트"}
                </span>
              );
            })}
          </ProfileInfoCard.MoreInfo>
          <ProfileInfoCard.MoreInfo>{email}</ProfileInfoCard.MoreInfo>
          <ProfileInfoCard.MoreInfo>{phoneNumber}</ProfileInfoCard.MoreInfo>
        </div>
      </ProfileInfoInfoWrap>
    </ProfileInfoCard>
  );
};
