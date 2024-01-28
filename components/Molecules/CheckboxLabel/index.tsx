import { memo } from "react";

import styled from "@emotion/styled";
import CheckIcon from "@/public/icon/check.svg";

const CheckboxWrap = styled.div`
  display: inline-flex;

  path {
    fill: var(--gray-sub1);
  }

  .checkboxInput {
    display: none;
  }

  input[type="checkbox"]:checked + label path {
    fill: var(--primary-color-y);
  }

  label {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    font-size: var(--font-size-xxs);
    margin-right: 20px;
    cursor: pointer;
  }

  &:hover {
    path {
      fill: var(--primary-color-y);
    }
  }
`;

interface CheckboxLabelProps {
  label?: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  onChange: (name: string, type, checked: boolean, newValue) => void;
  checked?: boolean;
  id?: string;
  children?: React.ReactNode;
}

function CheckboxLabel({
  label,
  name,
  value,
  onChange,
  checked,
  id,
  children,
}: CheckboxLabelProps) {
  const handleInputChange = (event) => {
    const { name, value: newValue, type, checked } = event.target;
    onChange(name, type, checked, newValue);
  };

  return (
    <CheckboxWrap>
      <input
        className="checkboxInput"
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleInputChange}
      />
      <label htmlFor={id}>
        <CheckIcon className="checkbox-icon" />
        {label}
      </label>
      {children}
    </CheckboxWrap>
  );
}

export default memo(CheckboxLabel);
