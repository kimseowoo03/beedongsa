import { memo } from "react";

interface InterviewProps {
  question: string;
  value: string;
  name: string;
  onChange: (name: string, type, checked: boolean, newValue) => void;
}
const Interview = ({ question, value, name, onChange }: InterviewProps) => {
  const handleInputChange = (event) => {
    const { name, value: newValue, type, checked } = event.target;
    onChange(name, type, checked, newValue);
  };

  return (
    <div>
      <div>
        <p>Q. {question}</p>
      </div>
      <div>
        <input
          type="text"
          value={value}
          name={name}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
export default memo(Interview);
