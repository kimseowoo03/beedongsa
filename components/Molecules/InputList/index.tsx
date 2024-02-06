import React, { createContext, useContext, useState, memo } from "react";

interface InputListContextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputExplanationValue: string;
  setinputExplanationValue: React.Dispatch<React.SetStateAction<string>>;
  itemList: string[];
  setItemList: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddItem: () => void;
}
const InputListContext = createContext<InputListContextType>({
  inputValue: "",
  setInputValue: () => {},
  inputExplanationValue: "",
  setinputExplanationValue: () => {},
  itemList: [],
  setItemList: () => {},
  handleAddItem: () => {},
});

interface InputListMainProps {
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
  name,
  handleClick,
  value,
  children,
}: InputListMainProps) => {
  const [inputValue, setInputValue] = useState("");
  const [inputExplanationValue, setinputExplanationValue] = useState("");

  const [itemList, setItemList] = useState([]);

  const handleAddItem = () => {
    const newEntry = `${inputValue}/${inputExplanationValue}`;

    const isDuplicate = itemList.some((entry) => entry === newEntry);

    if (!isDuplicate) {
      handleClick({ value: [...itemList, newEntry], name });
      setItemList([...itemList, newEntry]);
      setinputExplanationValue("");
      setInputValue("");
    }
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
      }}
    >
      {children}
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
  const { itemList } = useContext(InputListContext);
  return (
    <ul>
      {itemList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export const InputList = Object.assign(InputListMain, {
  Field: memo(InputField),
  AddButton: memo(AddButton),
  List: memo(ItemList),
  FieldExplanation: memo(InputFieldExplanation),
});
