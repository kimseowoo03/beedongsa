"use client";

/**react, next */
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";

/**style */
import styled from "@emotion/styled";

/**상태관리 */
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

/**components */
import { MultipleSelection } from "@/components/Molecules/CheckboxLabel";
import InputLabel from "@/components/Molecules/InputLabel";
import {
  ContentActionBar,
  ActionBox,
} from "@/components/Molecules/ContentActionBar";

/**hooks */

/**type */
import type { TokenType } from "@/types/auth";
import { Lecture } from "@/types/lecture";
import { InputList } from "@/components/Molecules/InputList";
import { SelectRegion } from "@/components/Molecules/SelectRegion";
import Interviews from "@/components/Molecules/Interviews";

const Wrap = styled.div`
  padding: 50px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

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

interface submitLectureProps {
  id?: string;
  type: "create" | "edit";
  formData: Lecture;
  token: NonNullable<TokenType>;
}
const submitLecture = async ({
  id,
  type,
  formData,
  token,
}: submitLectureProps): Promise<any> => {
  let bodyData: Lecture & { id?: string } = { ...formData };

  if (type === "edit") {
    bodyData.id = id;
  }

  const response = await fetch(`/api/lecture/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }
  return response.json();
};

interface LectureFormProps {
  formType: "create" | "edit";
  lectureData?: Lecture;
  lectureID?: string;
}
export const LectureForm = ({
  formType,
  lectureData,
  lectureID: id,
}: LectureFormProps) => {
  const [{ idToken, email: registeredEmail }] = useAtom(userAtom);
  const userID = registeredEmail.split("@")[0];

  const initialValues: Lecture = {
    registeredEmail,
    title: "",
    description: "",
    category: [],
    availableRegions: [],
    isDemoLecture: "",
    target: [],
    totalTime: undefined,
    expense: [],
    multiSessionPricing: "",
    additionalCost: "",
    includedDetails: "",
    isLongDistance: "",
    linkAttached: [],
    interview1: "",
    interview2: "",
    interview3: "",
    curriculum: [],
    administratorApproval: false,
    closeLectures: false,
    temporaryStorage: false,
    ...lectureData,
  };

  const [values, setValues] = useState(initialValues);
  const [etcCategory, setEtcCategory] = useState("");
  const [
    etcPreferredLectureOrConsultingStyle,
    setEtcPreferredLectureOrConsultingStyle,
  ] = useState("");

  const mutation = useMutation({
    mutationFn: submitLecture,
  });

  const submitHandler = (isTemporaryStorage: boolean) => {
    //수정, 추가할때, 임시저장여부에 따라 임시저장키 값 설정
    const updatedValues = isTemporaryStorage
      ? { ...values, temporaryStorage: true }
      : { ...values, temporaryStorage: false };

    const mutateData: submitLectureProps = {
      type: formType,
      formData: updatedValues as Lecture,
      token: idToken,
    };

    if (lectureData) {
      mutateData.id = id; // id를 조건부로 추가
    }

    mutation.mutate(mutateData, {
      onSuccess: (response) => {
        alert(response.message);
        location.replace(`/${userID}`);
      },
    });
  };

  const onChange = useCallback((name: string, type, checked, newValue) => {
    console.log(name, newValue);
    setValues((prevValues) => {
      // 배열인경우
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

      // 체크박스인데, 배열이 아니면 한 개만 선택되도록 로직 수정
      if (type === "checkbox") {
        return {
          ...prevValues,
          [name]: checked ? newValue : "",
        };
      }

      // 기타 입력 타입에 대한 처리
      const value = type === "number" ? Number(newValue) : newValue;
      return {
        ...prevValues,
        [name]: value,
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
  console.log(values.questions, "<<isLongDistance");

  return (
    <div>
      <ContentActionBar>
        <ActionBox>
          {formType === "create" && (
            <button
              type="button"
              disabled={false}
              onClick={() => submitHandler(true)}
            >
              임시저장
            </button>
          )}
          <button
            type="button"
            disabled={false}
            onClick={() => submitHandler(false)}
          >
            {formType === "create" ? "등록" : "확인"}
          </button>
        </ActionBox>
      </ContentActionBar>
      <div>
        <InputLabel
          label="강의 제목"
          type="text"
          name="title"
          placeholder="ex) 나만의 계절꽃다발 만들기 (꽃다발을 가져갈 수 있어요.)"
          value={values.title}
          onChange={onChange}
        />
        <InputLabel
          label="강의 설명"
          type="text"
          name="description"
          placeholder="강의에 대해 소개해주세요."
          value={values.description}
          onChange={onChange}
        />

        <SelectRegion
          handleClick={handleClick}
          name="availableRegions"
          value={values.availableRegions}
        >
          <SelectRegion.CitySelect />
          <SelectRegion.RegionDetailSelect />
          <SelectRegion.SelectedList />
        </SelectRegion>

        <MultipleSelection values={values.category}>
          <div className="label">카테고리</div>
          <div>
            <MultipleSelection.CheckboxLabel
              label="미술/공예"
              type="checkbox"
              name="category"
              id="미술/공예"
              value="미술/공예"
              onChange={onChange}
              checked={values.category.includes("미술/공예")}
            />
            <MultipleSelection.CheckboxLabel
              label="체육/건강"
              type="checkbox"
              name="category"
              id="체육/건강"
              value="체육/건강"
              onChange={onChange}
              checked={values.category.includes("체육/건강")}
            />
            <MultipleSelection.CheckboxLabel
              label="음악"
              type="checkbox"
              name="category"
              id="음악"
              value="음악"
              onChange={onChange}
              checked={values.category.includes("음악")}
            />
            <MultipleSelection.CheckboxLabel
              label="문화 심리"
              type="checkbox"
              name="category"
              id="문화 심리"
              value="문화 심리"
              onChange={onChange}
              checked={values.category.includes("문화 심리")}
            />
            <MultipleSelection.CheckboxLabel
              label="요리/베이킹"
              type="checkbox"
              name="category"
              id="요리/베이킹"
              value="요리/베이킹"
              onChange={onChange}
              checked={values.category.includes("요리/베이킹")}
            />
            <MultipleSelection.CheckboxLabel
              label="실무교육/조직문화"
              type="checkbox"
              name="category"
              id="실무교육/조직문화"
              value="실무교육/조직문화"
              onChange={onChange}
              checked={values.category.includes("실무교육/조직문화")}
            />
            <MultipleSelection.CheckboxLabel
              label="외국어"
              type="checkbox"
              name="category"
              id="외국어"
              value="외국어"
              onChange={onChange}
              checked={values.category.includes("외국어")}
            />
            <MultipleSelection.CheckboxLabel
              label="경영/경제/마케팅"
              type="checkbox"
              name="category"
              id="경영/경제/마케팅"
              value="경영/경제/마케팅"
              onChange={onChange}
              checked={values.category.includes("경영/경제/마케팅")}
            />
            <MultipleSelection.CheckboxLabel
              label="수학/과학"
              type="checkbox"
              name="category"
              id="수학/과학"
              value="수학/과학"
              onChange={onChange}
              checked={values.category.includes("수학/과학")}
            />
            <MultipleSelection.CheckboxLabel
              label="컴퓨터/IT"
              type="checkbox"
              name="category"
              id="컴퓨터/IT"
              value="컴퓨터/IT"
              onChange={onChange}
              checked={values.category.includes("컴퓨터/IT")}
            />
            <MultipleSelection.CheckboxLabel
              label="취업/자기개발"
              type="checkbox"
              name="category"
              id="취업/자기개발"
              value="취업/자기개발"
              onChange={onChange}
              checked={values.category.includes("취업/자기개발")}
            />
            <MultipleSelection.CheckboxLabel
              label="취미/실용/스포츠"
              type="checkbox"
              name="category"
              id="취미/실용/스포츠"
              value="취미/실용/스포츠"
              onChange={onChange}
              checked={values.category.includes("취미/실용/스포츠")}
            />
            <MultipleSelection.CheckboxLabel
              label="기타"
              type="checkbox"
              name="category"
              id={etcCategory}
              value={etcCategory}
              onChange={onChange}
              checked={values.category.includes(etcCategory)}
            >
              <EtcInput
                type="text"
                placeholder="입력 후 체크"
                name="etcCategory"
                value={etcCategory}
                onChange={(e) => setEtcCategory(e.target.value)}
                disabled={values.category.includes(etcCategory)}
              />
            </MultipleSelection.CheckboxLabel>
          </div>
        </MultipleSelection>

        <MultipleSelection values={values.isDemoLecture}>
          <div className="label">데모 강의 여부</div>
          <MultipleSelection.CheckboxLabel
            label="무료가능"
            type="checkbox"
            name="isDemoLecture"
            id="무료가능"
            value="무료가능"
            onChange={onChange}
            checked={values.isDemoLecture === "무료가능"}
          />
          <MultipleSelection.CheckboxLabel
            label="유료가능"
            type="checkbox"
            name="isDemoLecture"
            id="유료가능"
            value="유료가능"
            onChange={onChange}
            checked={values.isDemoLecture === "유료가능"}
          />
          <MultipleSelection.CheckboxLabel
            label="불가능"
            type="checkbox"
            name="isDemoLecture"
            id="불가능"
            value="불가능"
            onChange={onChange}
            checked={values.isDemoLecture === "불가능"}
          />
        </MultipleSelection>

        <MultipleSelection values={values.target}>
          <div className="label">대상</div>
          <div>
            <MultipleSelection.CheckboxLabel
              label="영유아"
              type="checkbox"
              name="target"
              id="영유아"
              value="영유아"
              onChange={onChange}
              checked={values.target.includes("영유아")}
            />
            <MultipleSelection.CheckboxLabel
              label="초등학생"
              type="checkbox"
              name="target"
              id="초등학생"
              value="초등학생"
              onChange={onChange}
              checked={values.target.includes("초등학생")}
            />
            <MultipleSelection.CheckboxLabel
              label="중학생"
              type="checkbox"
              name="target"
              id="중학생"
              value="중학생"
              onChange={onChange}
              checked={values.target.includes("중학생")}
            />
            <MultipleSelection.CheckboxLabel
              label="고등학생"
              type="checkbox"
              name="target"
              id="고등학생"
              value="고등학생"
              onChange={onChange}
              checked={values.target.includes("고등학생")}
            />
            <MultipleSelection.CheckboxLabel
              label="청년"
              type="checkbox"
              name="target"
              id="청년"
              value="청년"
              onChange={onChange}
              checked={values.target.includes("청년")}
            />
            <MultipleSelection.CheckboxLabel
              label="중년"
              type="checkbox"
              name="target"
              id="중년"
              value="중년"
              onChange={onChange}
              checked={values.target.includes("중년")}
            />
            <MultipleSelection.CheckboxLabel
              label="장년"
              type="checkbox"
              name="target"
              id="장년"
              value="장년"
              onChange={onChange}
              checked={values.target.includes("장년")}
            />
            <MultipleSelection.CheckboxLabel
              label="기업"
              type="checkbox"
              name="target"
              id="기업"
              value="기업"
              onChange={onChange}
              checked={values.target.includes("기업")}
            />
          </div>
        </MultipleSelection>

        <InputLabel
          label="총 소요시간"
          type="number"
          name="totalTime"
          placeholder="ex) 80 (분) 숫자로만 입력해주세요."
          value={values.totalTime}
          onChange={onChange}
        />

        <InputList
          label="비용(1회)"
          handleClick={handleClick}
          name="expense"
          value={values.expense}
        >
          <InputList.Field />
          <InputList.FieldExplanation />
          <InputList.AddButton />
          <InputList.List />
        </InputList>

        <InputLabel
          label="다회차 책정 기준"
          type="text"
          name="multiSessionPricing"
          placeholder="ex) 1달 4회 35만원 (20명 이하)"
          value={values.multiSessionPricing}
          onChange={onChange}
        />
        <InputLabel
          label="추가비용 책정 기준"
          type="text"
          name="additionalCost"
          placeholder="장거리, 1박 이상의 일정, 재료비 등 추가비용이 필요한 경우 작성해요."
          value={values.additionalCost}
          onChange={onChange}
        />
        <InputLabel
          label="포함 내역"
          type="text"
          name="includedDetails"
          placeholder="ex) 유인물, 교구재 대여, 실습재료"
          value={values.includedDetails}
          onChange={onChange}
        />

        <MultipleSelection values={values.isLongDistance}>
          <div className="label">장거리 출장가능여부</div>
          <MultipleSelection.CheckboxLabel
            label="가능"
            type="checkbox"
            name="isLongDistance"
            id="Y"
            value="Y"
            onChange={onChange}
            checked={values.isLongDistance === "Y"}
          />
          <MultipleSelection.CheckboxLabel
            label="불가능"
            type="checkbox"
            name="isLongDistance"
            id="N"
            value="N"
            onChange={onChange}
            checked={values.isLongDistance === "N"}
          />
        </MultipleSelection>

        <InputList
          label="링크첨부"
          handleClick={handleClick}
          name="linkAttached"
          value={values.linkAttached}
        >
          <InputList.Field />
          <InputList.FieldExplanation />
          <InputList.AddButton />
          <InputList.List />
        </InputList>

        <InputList
          label="커리큘럼"
          handleClick={handleClick}
          name="curriculum"
          value={values.curriculum}
        >
          <InputList.Field />
          <InputList.FieldExplanation />
          <InputList.AddButton />
          <InputList.List />
        </InputList>

        <Interviews
          values={{
            interview1: values.interview1,
            interview2: values.interview2,
            interview3: values.interview3,
          }}
          handleClick={handleClick}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
