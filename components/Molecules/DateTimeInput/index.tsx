import React, { createContext, useContext, useState } from "react";

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
});

interface DateTimeBoxMainProps {
  children: React.ReactNode;
}
const DateTimeBoxMain = ({ children }: DateTimeBoxMainProps) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedule, setSchedule] = useState([]);

  const handleCreateDate = () => {
    const newEntry = `${date}/${startTime}~${endTime}`;
    setSchedule([...schedule, newEntry]);
    console.log(newEntry, "newEntry", schedule, "<<schedule");
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
      }}
    >
      {children}
    </DateTimeBoxContext.Provider>
  );
};

const DateTimeBoxDate = () => {
  const { date, setDate } = useContext(DateTimeBoxContext);
  return (
    <label>
      날짜:
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
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
  const { schedule } = useContext(DateTimeBoxContext);
  return (
    <ul>
      {schedule.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
export const DateTimeBox = Object.assign(DateTimeBoxMain, {
  Date: DateTimeBoxDate,
  Time: DateTimeBoxTime,
  CreateButton: DateTimeBoxCreateButton,
  ScheduleList: DateTimeBoxScheduleList,
});
