"use client";

import styled from "@emotion/styled";

const InfoCard = styled.div`
  display: flex;
  gap: var(--gap);
`;

const Photo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-medium);
  background-color: var(--font-color-1);
  color: #fff;
`;

const Name = styled.p`
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-medium);
  color: var(--font-color-1);
  margin-bottom: var(--gap);
`;

const MoreInfo = styled.p`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  color: var(--font-color-2);
  line-height: 2;
`;

interface ProfileBasicInfoMainProps {
  children: React.ReactNode;
}
const ProfileInfoCardMain = ({ children }: ProfileBasicInfoMainProps) => {
  return <InfoCard>{children}</InfoCard>;
};

interface ProfilePhotoProps {
  children: React.ReactNode;
}
const ProfilePhoto = ({ children }: ProfilePhotoProps) => {
  return <Photo>{children}</Photo>;
};

interface ProfileNameProps {
  children: React.ReactNode;
}
const ProfileName = ({ children }: ProfileNameProps) => {
  return <Name>{children}</Name>;
};

interface ProfileMoreInfoProps {
  children: React.ReactNode;
}
const ProfileMoreInfo = ({ children }: ProfileMoreInfoProps) => {
  return <MoreInfo>{children}</MoreInfo>;
};

export const ProfileInfoCard = Object.assign(ProfileInfoCardMain, {
  Photo: ProfilePhoto,
  Name: ProfileName,
  MoreInfo: ProfileMoreInfo,
});
