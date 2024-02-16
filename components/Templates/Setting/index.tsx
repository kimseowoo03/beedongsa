import { EducatorSettingForm } from "@/components/Organisms/EducatorSettingForm";

import type { ClientUser, EducatorUser } from "@/types/user";

interface ProfileSettingProps {
  userData: EducatorUser | ClientUser;
}
export const ProfileSetting = ({ userData }: ProfileSettingProps) => {
  const { type } = userData;

  return (
    <>
      {type === "client" && <div></div>}

      {type === "educator" && <EducatorSettingForm userData={userData} />}
    </>
  );
};
