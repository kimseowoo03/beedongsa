export const ProfileBasicInfo = ({ children }) => {
  return <div>{children}</div>;
};

ProfileBasicInfo.Photo = function Photo({ children }) {
  return <div>{children}</div>;
};

ProfileBasicInfo.Name = function Name({ children }) {
  return <div>{children}</div>;
};

ProfileBasicInfo.MoreInfo = function MoreInfo({ children }) {
  return <p>{children}</p>;
};
