import React, { useState } from "react";

const DateTimeInput = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedule, setSchedule] = useState([]);

  const handleCreateDate = () => {
    const newEntry = `${date}/${startTime}~${endTime}`;
    setSchedule([...schedule, newEntry]);
    console.log(newEntry, "newEntry");
  };

  return (
    <div>
      <div>
        <label>
          날짜:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
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
        <button type="button" onClick={handleCreateDate}>
          추가
        </button>
      </div>

      <ul>
        {schedule.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DateTimeInput;
