"use client";

import { createContext, useContext, useState } from "react";

import styled from "@emotion/styled";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

const SelectBoxTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 16px;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-sub1);
  font-size: var(--font-size-xxs);
  color: var(--font-color-1);

  cursor: pointer;

  > svg {
    color: var(--font-color-1);
    width: 24px;
    height: 24px;
  }
`;

const SelectBoxSelectWrap = styled.ul`
  list-style: none;
  padding: 12px 16px;
  font-size: var(--font-size-xxs);
  color: var(--font-color-1);
  margin-top: 4px;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-sub1);

  height: 180px;
  overflow-y: scroll;
`;

const SelectBoxOptionWrap = styled.li`
  padding: 6px 0;
  cursor: pointer;
`;

interface SelectBoxContextType {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectBoxContext = createContext<SelectBoxContextType>({
  isClick: false,
  setIsClick: () => {},
});

interface SelectBoxMainProps {
  children: React.ReactNode;
}
const SelectBoxMain = ({ children }: SelectBoxMainProps) => {
  const [isClick, setIsClick] = useState(false);

  return (
    <SelectBoxContext.Provider value={{ isClick, setIsClick }}>
      {children}
    </SelectBoxContext.Provider>
  );
};

const SelectBoxTitle = ({ activeSelect }) => {
  const { isClick, setIsClick } = useContext(SelectBoxContext);

  return (
    <SelectBoxTitleWrap onClick={() => setIsClick((prev) => !prev)}>
      {activeSelect} {isClick ? <HiChevronUp /> : <HiChevronDown />}
    </SelectBoxTitleWrap>
  );
};

interface SelectBoxSelectProps {
  children: React.ReactNode;
}
const SelectBoxSelect = ({ children }: SelectBoxSelectProps) => {
  const { isClick } = useContext(SelectBoxContext);

  if (!isClick) {
    return null;
  }

  return <SelectBoxSelectWrap>{children}</SelectBoxSelectWrap>;
};

interface SelectBoxOptionProps {
  value: string;
  name: string;
  setValues: (updater: (prevState: any) => any) => void;
  children?: React.ReactNode;
}
const SelectBoxOption = ({
  value,
  name,
  setValues,
  children,
}: SelectBoxOptionProps) => {
  const { setIsClick } = useContext(SelectBoxContext);

  const optionClickHandler = () => {
    //form value 직접 업데이트
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setIsClick((prev) => !prev);
  };
  return (
    <SelectBoxOptionWrap onClick={optionClickHandler}>
      {value}
      {children}
    </SelectBoxOptionWrap>
  );
};

export const SelectBox = Object.assign(SelectBoxMain, {
  Title: SelectBoxTitle,
  Select: SelectBoxSelect,
  Option: SelectBoxOption,
});
