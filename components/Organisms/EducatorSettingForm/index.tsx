import { ProfileSetting } from "@/components/Molecules/ProfileSetting";
import { EducatorUser } from "@/types/user";
import { useCallback, useState } from "react";

interface EducatorSettingFormProps {
  userData: EducatorUser;
}
export const EducatorSettingForm = ({ userData }: EducatorSettingFormProps) => {
  const initialValues: EducatorUser = {
    type: "educator",
    name: "",
    email: "",
    phoneNumber: undefined,
    password: "",
    serviceTermsAccepted: true,
    privacyPolicyAgreed: true,
    eventEnabled: false,
    educatorType: [],
    lectureTopic: [],
    experience: undefined,
    experienceRecord: [],
    certificate: [],
    etcRecord: [],
    education: [],
    ...userData,
  };

  const [values, setValues] = useState(initialValues);

  const onChange = useCallback((name: string, type, checked, newValue) => {
    setValues((prevValues) => {
      if (Array.isArray(prevValues[name])) {
        return {
          ...prevValues,
          [name]:
            newValue === ""
              ? []
              : prevValues[name].includes(newValue)
              ? prevValues[name].filter((item: string) => item !== newValue)
              : [...prevValues[name], newValue],
        };
      }

      const value = type === "number" ? Number(newValue) : newValue;

      return {
        ...prevValues,
        [name]: type !== "checkbox" ? value : checked,
      };
    });
  }, []);

  return (
    <ProfileSetting onChange={onChange}>
      <ProfileSetting.Category values={values.lectureTopic} />
    </ProfileSetting>
  );
};
