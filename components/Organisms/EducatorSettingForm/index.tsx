import { ProfileSetting } from "@/components/Molecules/ProfileSetting";
import { EducatorUser } from "@/types/user";

interface EducatorSettingFormProps {
  userData: EducatorUser;
}
export const EducatorSettingForm = ({ userData }: EducatorSettingFormProps) => {
  const { lectureTopic } = userData;

  return (
    <ProfileSetting>
      <ProfileSetting.Category value={lectureTopic} />
    </ProfileSetting>
  );
};
