import {
  ActionBox,
  ContentActionBar,
} from "@/components/Molecules/ContentActionBar";
import { createContext } from "react";

interface ProfileSettingContextType {
  submitHandler: () => void;
}
const ProfileSettingContext = createContext<ProfileSettingContextType>({
  submitHandler: () => {},
});

interface ProfileSettingMainProps {
  children: React.ReactNode;
}
const ProfileSettingMain = ({ children }: ProfileSettingMainProps) => {
  const submitHandler = () => {
    //유저 기본 정보 업데이트
  };

  return (
    <ProfileSettingContext.Provider
      value={{
        submitHandler,
      }}
    >
      <ContentActionBar>
        <ActionBox>
          <button type="button" disabled={false} onClick={submitHandler}>
            확인
          </button>
        </ActionBox>
      </ContentActionBar>
      {children}
    </ProfileSettingContext.Provider>
  );
};

interface ProfileCategoryProps {
  value: Array<string>;
}
const ProfileCategory = ({ value }: ProfileCategoryProps) => {
  return <div></div>;
};

const ProfileEducation = () => {
  return <div></div>;
};

const ProfileCareer = () => {
  return <div></div>;
};

const ProfileCertificate = () => {
  return <div></div>;
};

const ProfilePortfolio = () => {
  return <div></div>;
};

const ProfileEtcRecord = () => {
  return <div></div>;
};

export const ProfileSetting = Object.assign(ProfileSettingMain, {
  Category: ProfileCategory,
  Education: ProfileEducation,
  Career: ProfileCareer,
  Certificate: ProfileCertificate,
  EtcRecord: ProfileEtcRecord,
  Portfolio: ProfilePortfolio,
});
