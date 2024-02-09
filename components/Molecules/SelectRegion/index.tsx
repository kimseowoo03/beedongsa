import React, { useState, createContext, useContext, memo } from "react";

import styled from "@emotion/styled";
import { HiOutlineXMark } from "react-icons/hi2";

const Wrap = styled.div`
  ul {
    list-style: none;
  }
`;

const RegionWrap = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 50%;
  font-size: var(--font-size-xxs);

  ul {
    list-style: none;
    height: 180px;
    overflow: scroll;
  }

  li {
    padding: 6px 10px;
    color: var(--font-color-1);
    opacity: 0.7;

    &.selected {
      opacity: 1;
      background-color: var(--primary-color-y10);
    }
    &:hover {
      cursor: pointer;
      background-color: var(--primary-color-y10);
    }
  }
`;

const SelectedListWrap = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  font-size: var(--font-size-xxx);

  li {
    display: flex;
    align-items: center;
    gap: 2px;
    border: 1px solid var(--primary-color-y);
    border-radius: 40px;
    padding: 4px 10px;
    svg {
      cursor: pointer;
    }
  }
`;

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

interface SelectRegionContextType {
  selectedCity: string;
  selectedRegionDetail: string;
  selectedList: string[];
  handleCityChange: React.Dispatch<React.SetStateAction<string>>;
  handleRegionDetailChange: React.Dispatch<React.SetStateAction<string>>;
  handleAddToList: () => void;
  handleIDeleteToList: (itemToRemove: string) => void;
}
const SelectRegionContext = createContext<SelectRegionContextType>({
  selectedCity: "",
  selectedRegionDetail: "",
  selectedList: [],
  handleCityChange: (city: string) => {},
  handleRegionDetailChange: (regionDetail: string) => {},
  handleAddToList: () => {},
  handleIDeleteToList: (itemToRemove: string) => {},
});

const SelectRegionMain = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegionDetail, setSelectedRegionDetail] = useState("");
  const [selectedList, setSelectedList] = useState([]);

  const handleCityChange = (city: string) => {
    setSelectedCity(() => city);
  };

  const handleRegionDetailChange = (regionDetail: string) => {
    setSelectedRegionDetail(() => regionDetail);

    const newSelection = `${selectedCity} ${regionDetail}`;
    console.log(newSelection, regionDetail);
    if (!selectedList.includes(newSelection)) {
      setSelectedList(() => [...selectedList, newSelection]);
    }
  };

  const handleAddToList = () => {
    if (selectedCity && selectedRegionDetail) {
      const newSelection = `${selectedCity} ${selectedRegionDetail}`;
      if (!selectedList.includes(newSelection)) {
        setSelectedList([...selectedList, newSelection]);
      }
    }
  };

  const handleIDeleteToList = (itemToRemove: string) => {
    const updatedSchedule = selectedList.filter(
      (item) => item !== itemToRemove
    );
    setSelectedList(() => updatedSchedule);
  };

  return (
    <SelectRegionContext.Provider
      value={{
        selectedCity,
        selectedRegionDetail,
        selectedList,
        handleCityChange,
        handleRegionDetailChange,
        handleAddToList,
        handleIDeleteToList,
      }}
    >
      <Wrap>{children}</Wrap>
    </SelectRegionContext.Provider>
  );
};

const CitySelect = () => {
  const { selectedCity, handleCityChange } = useContext(SelectRegionContext);

  const optionClickHandler = (city: string) => {
    handleCityChange(city);
  };

  return (
    <RegionWrap>
      <p>지역</p>
      <ul>
        {CITYS.map((city) => (
          <li
            key={city}
            onClick={() => optionClickHandler(city)}
            className={selectedCity === city ? "selected" : ""}
          >
            {city}
          </li>
        ))}
      </ul>
    </RegionWrap>
  );
};

const RegionDetailSelect = () => {
  const { selectedCity, selectedList, handleRegionDetailChange } =
    useContext(SelectRegionContext);

  const optionClickHandler = (detail: string) => {
    handleRegionDetailChange(detail);
  };

  const details = REGIONDETAILS[selectedCity] || [];

  const isSelectedDetail = (detail: string) => {
    const fullDetail = `${selectedCity} ${detail}`;
    return selectedList.includes(fullDetail);
  };

  return (
    <RegionWrap>
      <p>상세지역</p>
      <ul>
        {details.map((detail: string) => (
          <li
            key={detail}
            onClick={() => optionClickHandler(detail)}
            className={isSelectedDetail(detail) ? "selected" : ""}
          >
            {detail}
          </li>
        ))}
      </ul>
    </RegionWrap>
  );
};

const AddButton = () => {
  const { handleAddToList } = useContext(SelectRegionContext);
  return <button onClick={handleAddToList}>추가</button>;
};

const SelectedList = () => {
  const { selectedList, handleIDeleteToList } = useContext(SelectRegionContext);
  return (
    <SelectedListWrap>
      {selectedList.map((item, index) => (
        <li key={index}>
          {item}
          <HiOutlineXMark onClick={() => handleIDeleteToList(item)} />
        </li>
      ))}
    </SelectedListWrap>
  );
};

export const SelectRegion = Object.assign(SelectRegionMain, {
  CitySelect,
  RegionDetailSelect,
  AddButton,
  SelectedList,
});
