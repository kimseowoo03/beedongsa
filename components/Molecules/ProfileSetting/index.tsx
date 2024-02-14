import { createContext, useContext, useState } from "react";

import styled from "@emotion/styled";

import {
  ActionBox,
  ContentActionBar,
} from "@/components/Molecules/ContentActionBar";

import { MultipleSelection } from "../CheckboxLabel";

const EtcInput = styled.input`
  width: 80px;
  box-sizing: border-box;
  padding: 4px;
  border: none;
  border-bottom: 1px solid var(--gray-sub1);

  &:focus {
    outline: none;
  }
`;

interface ProfileSettingContextType {
  submitHandler: () => void;
  onChange: (name: string, type, checked, newValue) => void;
}
const ProfileSettingContext = createContext<ProfileSettingContextType>({
  submitHandler: () => {},
  onChange: (name: string, type, checked, newValue) => {},
});

interface ProfileSettingMainProps {
  children: React.ReactNode;
  onChange: (name: string, type, checked, newValue) => void;
}
const ProfileSettingMain = ({
  children,
  onChange,
}: ProfileSettingMainProps) => {
  const submitHandler = () => {
    //유저 기본 정보 업데이트
  };
  return (
    <ProfileSettingContext.Provider
      value={{
        submitHandler,
        onChange,
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
  values: Array<string>;
}
const ProfileCategory = ({ values }: ProfileCategoryProps) => {
  const [etcCategory, setEtcCategory] = useState("");

  const { onChange } = useContext(ProfileSettingContext);

  return (
    <MultipleSelection values={values}>
      <div className="label">카테고리</div>
      <div>
        <MultipleSelection.CheckboxLabel
          label="미술/공예"
          type="checkbox"
          name="category"
          id="미술/공예"
          value="미술/공예"
          onChange={onChange}
          checked={values.includes("미술/공예")}
        />
        <MultipleSelection.CheckboxLabel
          label="체육/건강"
          type="checkbox"
          name="category"
          id="체육/건강"
          value="체육/건강"
          onChange={onChange}
          checked={values.includes("체육/건강")}
        />
        <MultipleSelection.CheckboxLabel
          label="음악"
          type="checkbox"
          name="category"
          id="음악"
          value="음악"
          onChange={onChange}
          checked={values.includes("음악")}
        />
        <MultipleSelection.CheckboxLabel
          label="문화 심리"
          type="checkbox"
          name="category"
          id="문화 심리"
          value="문화 심리"
          onChange={onChange}
          checked={values.includes("문화 심리")}
        />
        <MultipleSelection.CheckboxLabel
          label="요리/베이킹"
          type="checkbox"
          name="category"
          id="요리/베이킹"
          value="요리/베이킹"
          onChange={onChange}
          checked={values.includes("요리/베이킹")}
        />
        <MultipleSelection.CheckboxLabel
          label="실무교육/조직문화"
          type="checkbox"
          name="category"
          id="실무교육/조직문화"
          value="실무교육/조직문화"
          onChange={onChange}
          checked={values.includes("실무교육/조직문화")}
        />
        <MultipleSelection.CheckboxLabel
          label="외국어"
          type="checkbox"
          name="category"
          id="외국어"
          value="외국어"
          onChange={onChange}
          checked={values.includes("외국어")}
        />
        <MultipleSelection.CheckboxLabel
          label="경영/경제/마케팅"
          type="checkbox"
          name="category"
          id="경영/경제/마케팅"
          value="경영/경제/마케팅"
          onChange={onChange}
          checked={values.includes("경영/경제/마케팅")}
        />
        <MultipleSelection.CheckboxLabel
          label="수학/과학"
          type="checkbox"
          name="category"
          id="수학/과학"
          value="수학/과학"
          onChange={onChange}
          checked={values.includes("수학/과학")}
        />
        <MultipleSelection.CheckboxLabel
          label="컴퓨터/IT"
          type="checkbox"
          name="category"
          id="컴퓨터/IT"
          value="컴퓨터/IT"
          onChange={onChange}
          checked={values.includes("컴퓨터/IT")}
        />
        <MultipleSelection.CheckboxLabel
          label="취업/자기개발"
          type="checkbox"
          name="category"
          id="취업/자기개발"
          value="취업/자기개발"
          onChange={onChange}
          checked={values.includes("취업/자기개발")}
        />
        <MultipleSelection.CheckboxLabel
          label="취미/실용/스포츠"
          type="checkbox"
          name="category"
          id="취미/실용/스포츠"
          value="취미/실용/스포츠"
          onChange={onChange}
          checked={values.includes("취미/실용/스포츠")}
        />
        <MultipleSelection.CheckboxLabel
          label="기타"
          type="checkbox"
          name="category"
          id={etcCategory}
          value={etcCategory}
          onChange={onChange}
          checked={values.includes(etcCategory)}
        >
          <EtcInput
            type="text"
            placeholder="입력 후 체크"
            name="etcCategory"
            value={etcCategory}
            onChange={(e) => setEtcCategory(e.target.value)}
            disabled={values.includes(etcCategory)}
          />
        </MultipleSelection.CheckboxLabel>
      </div>
    </MultipleSelection>
  );
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
