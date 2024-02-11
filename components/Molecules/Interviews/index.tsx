import { memo, useEffect } from "react";

interface InterviewsProps {
  values: { [key: string]: string };
  handleClick: ({
    value,
    name,
  }: {
    value: string | Array<string>;
    name: string;
  }) => void;
  onChange: (
    name: string,
    type: "text",
    checked: boolean,
    newValue: string
  ) => void;
}
const Interviews = ({ values, handleClick, onChange }: InterviewsProps) => {
  const questions = [
    "interview1 강의 분야에 대한 당신의 전문성을 어떻게 기르셨나요?",
    "interview2 강의/컨설팅을 준비하는 과정에서 가장 중요하게 생각하는 부분은 무엇인가요?",
    "interview3 참여자들과의 상호작용을 어떻게 촉진하나요?",
  ];

  const handleInputChange = (event) => {
    const { name, value: newValue, type, checked } = event.target;
    onChange(name, type, checked, newValue);
  };

  useEffect(() => {
    handleClick({ value: questions, name: "questions" });
  }, []);

  return (
    <div>
      {questions.map((question) => {
        const [name] = question.split(" ");
        return (
          <div key={name}>
            <div>
              <p>Q. {question.substring(name.length)}</p>
            </div>
            <div>
              <input
                type="text"
                value={values[name]}
                name={name}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default memo(Interviews);
