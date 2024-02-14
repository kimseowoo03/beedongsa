import { useCallback, useState } from "react";

import { MultipleSelection } from "@/components/Molecules/CheckboxLabel";
import {
  ActionBox,
  ContentActionBar,
} from "@/components/Molecules/ContentActionBar";
import { DateTimeBox } from "@/components/Molecules/DateTimeInput";

import styled from "@emotion/styled";

import type { EducatorUser } from "@/types/user";
import InputLabel from "@/components/Molecules/InputLabel";

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

  const [etcCategory, setEtcCategory] = useState("");
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

  const handleClick = useCallback(
    ({ value, name }: { value: string | Array<string>; name: string }) => {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    []
  );

  const submitHandler = () => {};

  return (
    <div>
      <ContentActionBar>
        <ActionBox>
          <button type="button" disabled={false} onClick={submitHandler}>
            확인
          </button>
        </ActionBox>
      </ContentActionBar>
      <InputLabel
        label="총 경력"
        type="text"
        name="experience"
        value={values.experience}
        onChange={onChange}
      />
      <div>
        상세 경력
        <DateTimeBox
          handleClick={handleClick}
          name="experienceRecord"
          scheduleValue={values.experienceRecord}
        >
          <DateTimeBox.Date isEndDate={true} />
          <DateTimeBox.Input />
          <DateTimeBox.CreateButton />
          <DateTimeBox.List />
        </DateTimeBox>
      </div>
      <MultipleSelection values={values.lectureTopic}>
        <div className="label">카테고리</div>
        <div>
          <MultipleSelection.CheckboxLabel
            label="미술/공예"
            type="checkbox"
            name="lectureTopic"
            id="미술/공예"
            value="미술/공예"
            onChange={onChange}
            checked={values.lectureTopic.includes("미술/공예")}
          />
          <MultipleSelection.CheckboxLabel
            label="체육/건강"
            type="checkbox"
            name="lectureTopic"
            id="체육/건강"
            value="체육/건강"
            onChange={onChange}
            checked={values.lectureTopic.includes("체육/건강")}
          />
          <MultipleSelection.CheckboxLabel
            label="음악"
            type="checkbox"
            name="lectureTopic"
            id="음악"
            value="음악"
            onChange={onChange}
            checked={values.lectureTopic.includes("음악")}
          />
          <MultipleSelection.CheckboxLabel
            label="문화 심리"
            type="checkbox"
            name="lectureTopic"
            id="문화 심리"
            value="문화 심리"
            onChange={onChange}
            checked={values.lectureTopic.includes("문화 심리")}
          />
          <MultipleSelection.CheckboxLabel
            label="요리/베이킹"
            type="checkbox"
            name="lectureTopic"
            id="요리/베이킹"
            value="요리/베이킹"
            onChange={onChange}
            checked={values.lectureTopic.includes("요리/베이킹")}
          />
          <MultipleSelection.CheckboxLabel
            label="실무교육/조직문화"
            type="checkbox"
            name="lectureTopic"
            id="실무교육/조직문화"
            value="실무교육/조직문화"
            onChange={onChange}
            checked={values.lectureTopic.includes("실무교육/조직문화")}
          />
          <MultipleSelection.CheckboxLabel
            label="외국어"
            type="checkbox"
            name="lectureTopic"
            id="외국어"
            value="외국어"
            onChange={onChange}
            checked={values.lectureTopic.includes("외국어")}
          />
          <MultipleSelection.CheckboxLabel
            label="경영/경제/마케팅"
            type="checkbox"
            name="lectureTopic"
            id="경영/경제/마케팅"
            value="경영/경제/마케팅"
            onChange={onChange}
            checked={values.lectureTopic.includes("경영/경제/마케팅")}
          />
          <MultipleSelection.CheckboxLabel
            label="수학/과학"
            type="checkbox"
            name="lectureTopic"
            id="수학/과학"
            value="수학/과학"
            onChange={onChange}
            checked={values.lectureTopic.includes("수학/과학")}
          />
          <MultipleSelection.CheckboxLabel
            label="컴퓨터/IT"
            type="checkbox"
            name="lectureTopic"
            id="컴퓨터/IT"
            value="컴퓨터/IT"
            onChange={onChange}
            checked={values.lectureTopic.includes("컴퓨터/IT")}
          />
          <MultipleSelection.CheckboxLabel
            label="취업/자기개발"
            type="checkbox"
            name="lectureTopic"
            id="취업/자기개발"
            value="취업/자기개발"
            onChange={onChange}
            checked={values.lectureTopic.includes("취업/자기개발")}
          />
          <MultipleSelection.CheckboxLabel
            label="취미/실용/스포츠"
            type="checkbox"
            name="lectureTopic"
            id="취미/실용/스포츠"
            value="취미/실용/스포츠"
            onChange={onChange}
            checked={values.lectureTopic.includes("취미/실용/스포츠")}
          />
          <MultipleSelection.CheckboxLabel
            label="기타"
            type="checkbox"
            name="lectureTopic"
            id={etcCategory}
            value={etcCategory}
            onChange={onChange}
            checked={values.lectureTopic.includes(etcCategory)}
          >
            <EtcInput
              type="text"
              placeholder="입력 후 체크"
              name="etcCategory"
              value={etcCategory}
              onChange={(e) => setEtcCategory(e.target.value)}
              disabled={values.lectureTopic.includes(etcCategory)}
            />
          </MultipleSelection.CheckboxLabel>
        </div>
      </MultipleSelection>
      <div>
        학력
        <DateTimeBox
          handleClick={handleClick}
          name="etcRecord"
          scheduleValue={values.etcRecord}
        >
          <DateTimeBox.Date isEndDate={true} />
          <DateTimeBox.Input />
          <DateTimeBox.CreateButton />
          <DateTimeBox.List />
        </DateTimeBox>
      </div>
      <div>
        자격증
        <DateTimeBox
          handleClick={handleClick}
          name="certificate"
          scheduleValue={values.certificate}
        >
          <DateTimeBox.Date />
          <DateTimeBox.Input />
          <DateTimeBox.CreateButton />
          <DateTimeBox.List />
        </DateTimeBox>
      </div>
      <div>
        기타 이력
        <DateTimeBox
          handleClick={handleClick}
          name="etcRecord"
          scheduleValue={values.etcRecord}
        >
          <DateTimeBox.Date />
          <DateTimeBox.Input />
          <DateTimeBox.CreateButton />
          <DateTimeBox.List />
        </DateTimeBox>
      </div>
    </div>
  );
};
