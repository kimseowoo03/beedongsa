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

const CITYS = [
  "서울",
  "인천",
  "대전",
  "광주",
  "대구",
  "울산",
  "부산",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

const REGIONDETAILS = {
  서울: [
    "전체",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ],
  인천: [
    "전체",
    "계양구",
    "미추홀구",
    "남동구",
    "동구",
    "부평구",
    "서구",
    "연수구",
    "중구",
    "강화군",
    "옹진군",
  ],
  대전: ["전체", "대덕구", "동구", "서구", "유성구", "중구"],
  광주: ["전체", "광산구", "남구", "동구", "북구", "서구"],
  대구: [
    "전체",
    "남구",
    "달서구",
    "동구",
    "북구",
    "서구",
    "수성구",
    "중구",
    "달성군",
  ],
  울산: ["전체", "남구", "동구", "북구", "중구", "울주군"],
  부산: [
    "전체",
    "강서구",
    "금정구",
    "남구",
    "동구",
    "동래구",
    "부산진구",
    "북구",
    "사상구",
    "사하구",
    "서구",
    "수영구",
    "연제구",
    "영도구",
    "중구",
    "해운대구",
    "기장군",
  ],
  경기: [
    "전체",
    "고양시",
    "과천시",
    "광명시",
    "광주시",
    "구리시",
    "군포시",
    "김포시",
    "남양주시",
    "동두천시",
    "부천시",
    "성남시",
    "수원시",
    "시흥시",
    "안산시",
    "안성시",
    "안양시",
    "양주시",
    "오산시",
    "용인시",
    "의왕시",
    "의정부시",
    "이천시",
    "파주시",
    "평택시",
    "포천시",
    "하남시",
    "화성시",
    "가평군",
    "양평군",
    "여주군",
    "연천군",
  ],
  강원: [
    "전체",
    "강릉시",
    "동해시",
    "삼척시",
    "속초시",
    "원주시",
    "춘천시",
    "태백시",
    "고성군",
    "양구군",
    "양양군",
    "영월군",
    "인제군",
    "정선군",
    "철원군",
    "평창군",
    "홍천군",
    "화천군",
    "횡성군",
  ],
  충북: [
    "전체",
    "제천시",
    "청주시",
    "충주시",
    "괴산군",
    "단양군",
    "보은군",
    "영동군",
    "옥천군",
    "음성군",
    "증평군",
    "진천군",
    "청원군",
  ],
  충남: [
    "전체",
    "계룡시",
    "공주시",
    "논산시",
    "보령시",
    "서산시",
    "아산시",
    "천안시",
    "금산군",
    "당진군",
    "부여군",
    "서천군",
    "연기군",
    "예산군",
    "청양군",
    "태안군",
    "홍성군",
  ],
  전북: [
    "전체",
    "군산시",
    "김제시",
    "남원시",
    "익산시",
    "전주시",
    "정읍시",
    "고창군",
    "무주군",
    "부안군",
    "순창군",
    "완주군",
    "임실군",
    "장수군",
    "진안군",
  ],
  전남: [
    "전체",
    "광양시",
    "나주시",
    "목포시",
    "순천시",
    "여수시",
    "강진군",
    "고흥군",
    "곡성군",
    "구례군",
    "담양군",
    "무안군",
    "보성군",
    "신안군",
    "영광군",
    "영암군",
    "완도군",
    "장성군",
    "장흥군",
    "진도군",
    "함평군",
    "해남군",
    "화순군",
  ],
  경북: [
    "전체",
    "경산시",
    "경주시",
    "구미시",
    "김천시",
    "문경시",
    "상주시",
    "안동시",
    "영주시",
    "영천시",
    "포항시",
    "고령군",
    "군위군",
    "봉화군",
    "성주군",
    "영덕군",
    "영양군",
    "예천군",
    "울릉군",
    "울진군",
    "의성군",
    "청도군",
    "청송군",
    "칠곡군",
  ],
  경남: [
    "전체",
    "거제시",
    "김해시",
    "마산시",
    "밀양시",
    "사천시",
    "양산시",
    "진주시",
    "진해시",
    "창원시",
    "통영시",
    "거창군",
    "고성군",
    "남해군",
    "산청군",
    "의령군",
    "창녕군",
    "하동군",
    "함안군",
    "함양군",
    "합천군",
  ],
  제주: ["전체", "서귀포시", "제주시"],
};

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
        location.replace("/profile");
      },
    });
  };

  const onChange = useCallback((name: string, type, checked, newValue) => {
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
  console.log(values.isLongDistance, "<<isLongDistance");

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
          handleClick={handleClick}
          name="linkAttached"
          value={values.linkAttached}
        >
          <InputList.Field />
          <InputList.FieldExplanation />
          <InputList.AddButton />
          <InputList.List />
        </InputList>
      </div>
    </div>
  );
};
