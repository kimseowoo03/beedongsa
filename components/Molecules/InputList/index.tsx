import React, { createContext, useContext, useState, memo } from "react";

import styled from "@emotion/styled";
import { HiOutlineXMark } from "react-icons/hi2";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: var(--font-color-1);
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-medium);
  }

  input {
    padding: 12px 16px;
    border-radius: var(--border-radius);
    border: 1px solid var(--gray-sub1);
  }

  input:focus {
    outline: 2px solid var(--primary-color-y);
  }

  //숫자형 숫자 버튼 제거
  input::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

interface InputListContextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputExplanationValue: string;
  setinputExplanationValue: React.Dispatch<React.SetStateAction<string>>;
  itemList: string[];
  setItemList: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddItem: () => void;
  handleItemDelete: (itemToRemove: string) => void;
}
const InputListContext = createContext<InputListContextType>({
  inputValue: "",
  setInputValue: () => {},
  inputExplanationValue: "",
  setinputExplanationValue: () => {},
  itemList: [],
  setItemList: () => {},
  handleAddItem: () => {},
  handleItemDelete: (itemToRemove: string) => {},
});

interface InputListMainProps {
  label: string;
  name: string;
  handleClick?: ({
    value,
    name,
  }: {
    value: string | Array<string>;
    name: string;
  }) => void;
  value: Array<string>;
  children: React.ReactNode;
}
const InputListMain = ({
  label,
  name,
  handleClick,
  value,
  children,
}: InputListMainProps) => {
  const [inputValue, setInputValue] = useState("");
  const [inputExplanationValue, setinputExplanationValue] = useState("");

  const [itemList, setItemList] = useState([]);

  const handleAddItem = () => {
    const newEntry = `${inputValue} ${inputExplanationValue}`;

    const isDuplicate = itemList.some((entry) => entry === newEntry);

    if (!isDuplicate) {
      handleClick({ value: [...itemList, newEntry], name });
      setItemList([...itemList, newEntry]);
      setinputExplanationValue("");
      setInputValue("");
    }
  };

  const handleItemDelete = (itemToRemove: string) => {
    const updatedSchedule = itemList.filter((item) => item !== itemToRemove);
    handleClick({ value: updatedSchedule, name });
    setItemList(() => updatedSchedule);
  };

  return (
    <InputListContext.Provider
      value={{
        inputValue,
        setInputValue,
        inputExplanationValue,
        setinputExplanationValue,
        itemList,
        setItemList,
        handleAddItem,
        handleItemDelete,
      }}
    >
      <Wrap>
        <p>{label}</p>
        <div> {children}</div>
      </Wrap>
    </InputListContext.Provider>
  );
};

const InputFieldExplanation = () => {
  const { inputExplanationValue, setinputExplanationValue } =
    useContext(InputListContext);
  return (
    <input
      type="text"
      value={inputExplanationValue}
      onChange={(e) => setinputExplanationValue(e.target.value)}
    />
  );
};

const InputField = () => {
  const { inputValue, setInputValue } = useContext(InputListContext);
  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

const AddButton = () => {
  const { handleAddItem } = useContext(InputListContext);
  return <button onClick={handleAddItem}>추가하기</button>;
};

const ItemList = () => {
  const { itemList, handleItemDelete } = useContext(InputListContext);
  return (
    <ul>
      {itemList.map((item, index) => (
        <li key={index}>
          {item}
          <HiOutlineXMark onClick={() => handleItemDelete(item)} />
        </li>
      ))}
    </ul>
  );
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
};

export const InputList = Object.assign(memo(InputListMain, areEqual), {
  Field: InputField,
  AddButton: AddButton,
  List: ItemList,
  FieldExplanation: InputFieldExplanation,
});
