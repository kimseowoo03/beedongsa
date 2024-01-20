interface ProfileBasicInfoMainProps {
  children: React.ReactNode;
}
const ProfileInfoCardMain = ({ children }: ProfileBasicInfoMainProps) => {
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

export const ProfileInfoCard = Object.assign(ProfileInfoCardMain, {
  Photo: ProfilePhoto,
  Name: ProfileName,
  MoreInfo: ProfileMoreInfo,
});
