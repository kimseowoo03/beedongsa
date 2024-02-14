import React, { createContext, memo, useContext, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

interface DateTimeBoxContextType {
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  InputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  schedule: string[];
  setSchedule: React.Dispatch<React.SetStateAction<string[]>>;
  handleCreateDate: () => void;
  handleScheduleDelete: (scheduleToRemove: string) => void;
}

const DateTimeBoxContext = createContext<DateTimeBoxContextType>({
  startDate: "",
  setStartDate: () => {},
  endDate: "",
  setEndDate: () => {},
  InputValue: "",
  setInputValue: () => {},
  startTime: "",
  setStartTime: () => {},
  endTime: "",
  setEndTime: () => {},
  schedule: [],
  setSchedule: () => {},
  handleCreateDate: () => {},
  handleScheduleDelete: (scheduleToRemove: string) => {},
});

interface DateTimeBoxMainProps {
  scheduleValue?: Array<string>;
  name?: string;
  handleClick?: ({
    value,
    name,
  }: {
    value: string | Array<string>;
    name: string;
  }) => void;
  children: React.ReactNode;
}
const DateTimeBoxMain = ({
  scheduleValue,
  name,
  handleClick,
  children,
}: DateTimeBoxMainProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [InputValue, setInputValue] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [list, setList] = useState(scheduleValue ? scheduleValue : []);

  const handleCreateDate = () => {
    let newEntry = "";
    if (startDate && !endDate && InputValue) {
      //시작날짜 + 인풋
      newEntry = `${startDate} ${InputValue}`;
    } else if (startDate && endDate && InputValue) {
      // 시작 날짜 + 끝난 날짜 + 인풋
      newEntry = `${startDate}~${endDate} ${InputValue}`;
    } else if (startDate && startTime && endTime) {
      // 시작 날짜 + 시작시간~끝난시간
      newEntry = `${startDate}/${startTime}~${endTime}`;
    }

    const isDuplicate = list.some((entry) => entry === newEntry);

    if (!isDuplicate) {
      handleClick({ value: [...list, newEntry], name });
      setList(() => [...list, newEntry]);

      setStartDate(() => "");
      setEndDate(() => "");
      setStartTime(() => "");
      setEndTime(() => "");
      setInputValue(() => "");
    }
  };

  const handleScheduleDelete = (scheduleToRemove: string) => {
    const updatedSchedule = list.filter((item) => item !== scheduleToRemove);
    handleClick({ value: updatedSchedule, name });
    setList(() => updatedSchedule);
  };

  return (
    <DateTimeBoxContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        InputValue,
        setInputValue,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        schedule: list,
        setSchedule: setList,
        handleCreateDate,
        handleScheduleDelete,
      }}
    >
      {children}
    </DateTimeBoxContext.Provider>
  );
};

interface DateTimeBoxDateProps {
  value?: string;
  name?: string;
  onChange?: (name: string, type, checked: boolean, newValue) => void;
  isEndDate?: boolean;
}
const DateTimeBoxDate = ({
  value,
  name,
  onChange,
  isEndDate = false,
}: DateTimeBoxDateProps) => {
  const { startDate, setStartDate, endDate, setEndDate } =
    useContext(DateTimeBoxContext);

  const DateTimeBoxDateHandle = (
    e: React.ChangeEvent<HTMLInputElement>,
    DateType: "start" | "end"
  ) => {
    const { name, value: newValue, type, checked } = e.target;

    //TODO: 날짜만 사용하는 경우, 이 부분은 나중에 분리
    if (onChange) {
      onChange(name, type, checked, newValue);
    } else {
      const value = e.target.value;

      DateType === "start"
        ? setStartDate(() => value)
        : setEndDate(() => value);
    }
  };
  return (
    <>
      <input
        type="date"
        name={name}
        value={value ? value : startDate}
        onChange={(e) => DateTimeBoxDateHandle(e, "start")}
      />
      {isEndDate && (
        <input
          type="date"
          name={name}
          value={value ? value : endDate}
          onChange={(e) => DateTimeBoxDateHandle(e, "end")}
        />
      )}
    </>
  );
};

const DateTimeBoxTime = () => {
  const { startTime, setStartTime, endTime, setEndTime } =
    useContext(DateTimeBoxContext);
  return (
    <>
      <label>
        시작 시간:
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <label>
        종료 시간:
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>
    </>
  );
};

const DateTimeBoxInput = () => {
  const { InputValue, setInputValue } = useContext(DateTimeBoxContext);
  return (
    <input
      type="text"
      value={InputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

const DateTimeBoxCreateButton = () => {
  const { handleCreateDate } = useContext(DateTimeBoxContext);
  return (
    <button type="button" onClick={handleCreateDate}>
      추가
    </button>
  );
};

const DateTimeBoxScheduleList = () => {
  const { schedule, handleScheduleDelete } = useContext(DateTimeBoxContext);
  return (
    <ul>
      {schedule.map((item, index) => (
        <li key={index}>
          {item}
          <HiOutlineXMark onClick={() => handleScheduleDelete(item)} />
        </li>
      ))}
    </ul>
  );
};
export const DateTimeBox = Object.assign(DateTimeBoxMain, {
  Date: memo(DateTimeBoxDate),
  Time: memo(DateTimeBoxTime),
  Input: memo(DateTimeBoxInput),
  CreateButton: memo(DateTimeBoxCreateButton),
  List: memo(DateTimeBoxScheduleList),
});
