import React, { createContext, memo, useContext, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

interface DateTimeBoxContextType {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
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
  date: "",
  setDate: () => {},
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
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedule, setSchedule] = useState(scheduleValue ? scheduleValue : []);

  const handleCreateDate = () => {
    const newEntry = `${date}/${startTime}~${endTime}`;

    const isDuplicate = schedule.some((entry) => entry === newEntry);

    if (!isDuplicate) {
      handleClick({ value: [...schedule, newEntry], name });
      setSchedule(() => [...schedule, newEntry]);
    }
  };

  const handleScheduleDelete = (scheduleToRemove: string) => {
    const updatedSchedule = schedule.filter(
      (item) => item !== scheduleToRemove
    );
    handleClick({ value: updatedSchedule, name });
    setSchedule(() => updatedSchedule);
  };

  return (
    <DateTimeBoxContext.Provider
      value={{
        date,
        setDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        schedule,
        setSchedule,
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
}
const DateTimeBoxDate = ({ value, name, onChange }: DateTimeBoxDateProps) => {
  const { date, setDate } = useContext(DateTimeBoxContext);

  const DateTimeBoxDateHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: newValue, type, checked } = e.target;
    if (onChange) {
      onChange(name, type, checked, newValue);
    } else {
      const value = e.target.value;
      setDate(() => value);
    }
  };
  return (
    <label>
      날짜:
      <input
        type="date"
        name={name}
        value={value ? value : date}
        onChange={DateTimeBoxDateHandle}
      />
    </label>
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
  CreateButton: memo(DateTimeBoxCreateButton),
  ScheduleList: memo(DateTimeBoxScheduleList),
});
