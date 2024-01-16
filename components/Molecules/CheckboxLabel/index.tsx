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
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  id?: string;
  children?: React.ReactNode;
}

export default function CheckboxLabel({
  label,
  name,
  value,
  handleChange,
  checked,
  id,
  children,
}: CheckboxLabelProps) {
  return (
    <CheckboxWrap>
      <input
        className="checkboxInput"
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id}>
        <CheckIcon className="checkbox-icon" />
        {label}
      </label>
      {children}
    </CheckboxWrap>
  );
}
