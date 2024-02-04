"use client";
import { ProfileInfoCard } from "@/components/Molecules/ProfileInfoCard";
import type { ClientUser } from "@/types/user";
import styled from "@emotion/styled";

const ProfileInfoInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface ProfileClientHeader {
  userData: ClientUser;
}
export const ProfileClientHeader = ({ userData }: ProfileClientHeader) => {
  const { name, email, managerName, managerEmail, managerPhoneNumber } =
    userData;

  return (
    <ProfileInfoCard>
      <ProfileInfoCard.Photo>{name.substring(0, 4)}</ProfileInfoCard.Photo>
      <ProfileInfoInfoWrap>
        <ProfileInfoCard.Name>{name}</ProfileInfoCard.Name>
        <div>
          <ProfileInfoCard.MoreInfo>클라이언트</ProfileInfoCard.MoreInfo>
          <ProfileInfoCard.MoreInfo>{email}</ProfileInfoCard.MoreInfo>
          <ProfileInfoCard.MoreInfo>
            {managerName} | {managerPhoneNumber} | {managerEmail}
          </ProfileInfoCard.MoreInfo>
        </div>
      </ProfileInfoInfoWrap>
    </ProfileInfoCard>
  );
};
