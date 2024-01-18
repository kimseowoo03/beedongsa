interface ProfileBasicInfoMainProps {
  children: React.ReactNode;
}
const ProfileBasicInfoMain = ({ children }: ProfileBasicInfoMainProps) => {
  return <div>{children}</div>;
};

interface ProfilePhotoProps {
  children: React.ReactNode;
}
const ProfilePhoto = ({ children }: ProfilePhotoProps) => {
  return <div>{children}</div>;
};

interface ProfileNameProps {
  children: React.ReactNode;
}
const ProfileName = ({ children }: ProfileNameProps) => {
  return <div>{children}</div>;
};

interface ProfileMoreInfoProps {
  children: React.ReactNode;
}
const ProfileMoreInfo = ({ children }: ProfileMoreInfoProps) => {
  return <p>{children}</p>;
};

export const ProfileBasicInfo = Object.assign(ProfileBasicInfoMain, {
  Photo: ProfilePhoto,
  Name: ProfileName,
  MoreInfo: ProfileMoreInfo,
});
