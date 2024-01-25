"use client";

import { useState } from "react";

import CheckboxLabel from "@/components/Molecules/CheckboxLabel";
import InputLabel from "@/components/Molecules/InputLabel";

import styled from "@emotion/styled";

import useForm from "@/hooks/useForm";
import { SelectBox } from "@/components/Molecules/SelectBox";
import { DateTimeBox } from "@/components/Molecules/DateTimeInput";

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
  대전: ["대덕구", "동구", "서구", "유성구", "중구"],
  광주: ["광산구", "남구", "동구", "북구", "서구"],
  대구: ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
  울산: ["남구", "동구", "북구", "중구", "울주군"],
  부산: [
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
  제주: ["서귀포시", "제주시"],
};

const CategoryOptions = styled.div`
  .label {
    color: var(--font-color-1);
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-medium);
    margin-bottom: 8px;
  }
  .label::after {
    position: relative;
    left: 2px;
    top: -2px;
    content: "*";
    color: var(--primary-color-r);
  }
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

export const AnnouncementForm = () => {
  const initialValues: Announcement = {
    registeredEmail: "",
    title: "",
    category: [],
    metropolitanCity: "시/도",
    dstrict: "구/동/면",
    detailedAddress: "",
    schedule: [],
    recruitmentDeadline: "",
    target: [],
    personnel: undefined,
    totalCost: undefined,
    supportIncludedInTheCost: [],
    detail: "",
    desiredExperience: undefined,
    desiredQualifications: "",
    preferredLectureOrConsultingStyle: [],
    AdministratorApproval: true,
  };

  const { values, handleClick, handleChange } = useForm({
    initialValues,
  });

  const [etcCategory, setEtcCategory] = useState("");
  console.log(values, values.target.includes("중학생"), "valuesvalues");
  return (
    <form>
      <InputLabel
        label="공고제목"
        type="text"
        name="title"
        placeholder="ex) 나만의 계절꽃다발 만들기 (꽃다발을 가져갈 수 있어요.)"
        value={values.title}
        handleChange={(event) => handleChange(event)}
      />
      <CategoryOptions>
        <div className="label">카테고리</div>
        <div>
          <CheckboxLabel
            label="미술/공예"
            type="checkbox"
            name="category"
            id="미술/공예"
            value="미술/공예"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("미술/공예")}
          />
          <CheckboxLabel
            label="체육/건강"
            type="checkbox"
            name="category"
            id="체육/건강"
            value="체육/건강"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("체육/건강")}
          />
          <CheckboxLabel
            label="음악"
            type="checkbox"
            name="category"
            id="음악"
            value="음악"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("음악")}
          />
          <CheckboxLabel
            label="문화 심리"
            type="checkbox"
            name="category"
            id="문화 심리"
            value="문화 심리"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("문화 심리")}
          />
          <CheckboxLabel
            label="요리/베이킹"
            type="checkbox"
            name="category"
            id="요리/베이킹"
            value="요리/베이킹"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("요리/베이킹")}
          />
          <CheckboxLabel
            label="실무교육/조직문화"
            type="checkbox"
            name="category"
            id="실무교육/조직문화"
            value="실무교육/조직문화"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("실무교육/조직문화")}
          />
          <CheckboxLabel
            label="외국어"
            type="checkbox"
            name="category"
            id="외국어"
            value="외국어"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("외국어")}
          />
          <CheckboxLabel
            label="경영/경제/마케팅"
            type="checkbox"
            name="category"
            id="경영/경제/마케팅"
            value="경영/경제/마케팅"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("경영/경제/마케팅")}
          />
          <CheckboxLabel
            label="수학/과학"
            type="checkbox"
            name="category"
            id="수학/과학"
            value="수학/과학"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("수학/과학")}
          />
          <CheckboxLabel
            label="컴퓨터/IT"
            type="checkbox"
            name="category"
            id="컴퓨터/IT"
            value="컴퓨터/IT"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("컴퓨터/IT")}
          />
          <CheckboxLabel
            label="취업/자기개발"
            type="checkbox"
            name="category"
            id="취업/자기개발"
            value="취업/자기개발"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("취업/자기개발")}
          />
          <CheckboxLabel
            label="취미/실용/스포츠"
            type="checkbox"
            name="category"
            id="취미/실용/스포츠"
            value="취미/실용/스포츠"
            handleChange={(event) => handleChange(event)}
            checked={values.category.includes("취미/실용/스포츠")}
          />
          <CheckboxLabel
            label="기타"
            type="checkbox"
            name="category"
            id={etcCategory}
            value={etcCategory}
            handleChange={(event) => handleChange(event)}
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
          </CheckboxLabel>
        </div>
      </CategoryOptions>
      <div>
        <SelectBox>
          <SelectBox.Title activeSelect={values.metropolitanCity} />
          <SelectBox.Select>
            {CITYS.map((city) => (
              <SelectBox.Option
                handleClick={handleClick}
                name="metropolitanCity"
                key={city}
                value={city}
              ></SelectBox.Option>
            ))}
          </SelectBox.Select>
        </SelectBox>
        <SelectBox>
          <SelectBox.Title activeSelect={values.dstrict} />
          <SelectBox.Select>
            {REGIONDETAILS[values.metropolitanCity] &&
              REGIONDETAILS[values.metropolitanCity].map((dstrict: string) => (
                <SelectBox.Option
                  handleClick={handleClick}
                  name="dstrict"
                  key={dstrict}
                  value={dstrict}
                ></SelectBox.Option>
              ))}
          </SelectBox.Select>
        </SelectBox>
        <InputLabel
          isRequire={false}
          label="상세주소"
          type="text"
          name="detailedAddress"
          placeholder="상세장소 (ex 00고등학교) "
          value={values.detailedAddress}
          handleChange={(event) => handleChange(event)}
        />
      </div>

      <DateTimeBox handleClick={handleClick} name="schedule">
        <DateTimeBox.Date />
        <DateTimeBox.Time />
        <DateTimeBox.CreateButton />
        <DateTimeBox.ScheduleList />
      </DateTimeBox>

      <DateTimeBox>
        <DateTimeBox.Date
          name="recruitmentDeadline"
          handleChange={handleChange}
        />
        까지
      </DateTimeBox>

      <CategoryOptions>
        <div className="label">대상</div>
        <div>
          <CheckboxLabel
            label="영유아"
            type="checkbox"
            name="target"
            id="영유아"
            value="영유아"
            handleChange={(event) => handleChange(event)}
            checked={values.target.includes("영유아")}
          />
          <CheckboxLabel
            label="초등학생"
            type="checkbox"
            name="target"
            id="초등학생"
            value="초등학생"
            handleChange={(event) => handleChange(event)}
            checked={values.target.includes("초등학생")}
          />
          <CheckboxLabel
            label="중학생"
            type="checkbox"
            name="target"
            id="중학생"
            value="중학생"
            handleChange={(event) => handleChange(event)}
            checked={values.target.includes("중학생")}
          />
          <CheckboxLabel
            label="고등학생"
            type="checkbox"
            name="target"
            id="고등학생"
            value="고등학생"
            handleChange={(event) => handleChange(event)}
            checked={values.target.includes("고등학생")}
          />
          <CheckboxLabel
            label="청년"
            type="checkbox"
            name="target"
            id="청년"
            value="청년"
            handleChange={(event) => handleChange(event)}
            checked={values.target.includes("청년")}
          />
          <CheckboxLabel
            label="중년"
            type="checkbox"
            name="target"
            id="중년"
            value="중년"
            handleChange={(event) => handleChange(event)}
            checked={values.target.includes("중년")}
          />
          <CheckboxLabel
            label="장년"
            type="checkbox"
            name="target"
            id="장년"
            value="장년"
            handleChange={(event) => handleChange(event)}
            checked={values.target.includes("장년")}
          />
          <CheckboxLabel
            label="기업"
            type="checkbox"
            name="target"
            id="기업"
            value="기업"
            handleChange={(event) => handleChange(event)}
            checked={values.target.includes("기업")}
          />
        </div>
      </CategoryOptions>
    </form>
  );
};
