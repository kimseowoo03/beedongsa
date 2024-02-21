import { memo } from "react";
import styled from "@emotion/styled";

const Wrap = styled.div<{ isRequire: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: var(--font-color-1);
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-medium);
    ${({ isRequire }) =>
      isRequire &&
      `
      &::after {
        content: "*";
        position: relative;
        left: 2px;
        top: -2px;
        color: var(--primary-color-r);
      }
    `}
  }

  input {
    padding: 12px 16px;
    border-radius: var(--border-radius);
    border: 1px solid var(--gray-03);
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

interface InputLabelProps {
  isRequire?: boolean;
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  onChange: (name: string, type, checked: boolean, newValue) => void;
}

function InputLabel({
  isRequire = true,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: InputLabelProps) {
  const handleInputChange = (event) => {
    const { name, value: newValue, type, checked } = event.target;
    onChange(name, type, checked, newValue);
  };

  return (
    <Wrap isRequire={isRequire}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </Wrap>
  );
}

export default memo(InputLabel);
