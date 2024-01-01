import styled from "@emotion/styled";

import CheckIcon from "@/public/icon/check.svg";

const Wrap = styled.div<{ isRequire: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: var(--font-color-1);
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-medium);
  }

  label::after {
    position: relative;
    left: 2px;
    top: -2px;
    content: "*";
    color: var(--primary-color-r);
  }

  input {
    padding: 12px 16px;
    border-radius: var(--border-radius);
    border: 1px solid var(--gray-sub1);
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

const CheckboxWrap = styled.div`
  display: inline;

  path {
    fill: var(--gray-sub1);
  }

  input {
    display: none;
  }

  input[type="checkbox"]:checked + label path {
    fill: var(--primary-color-y);
  }

  label {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    font-size: var(--font-size-xxs);
    margin-right: var(--gap);
    cursor: pointer;
  }

  &:hover {
    path {
      fill: var(--primary-color-y);
    }
  }
`;

interface InputBoxProps {
  isRequire?: boolean;
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  id?: string;
}

const InputField = ({
  isRequire = true,
  label,
  type,
  name,
  placeholder,
  value,
  handleChange,
  checked,
  id,
}: InputBoxProps) => {
  // 체크박스일 때
  if (type === "checkbox") {
    return (
      <CheckboxWrap>
        <input
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
      </CheckboxWrap>
    );
  }

  // 체크박스가 아닐 때
  return (
    <Wrap isRequire={isRequire}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </Wrap>
  );
};
export default InputField;
