import styled from "@emotion/styled";

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

interface InputLabelProps {
  isRequire?: boolean;
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputLabel({
  isRequire = true,
  label,
  name,
  type,
  placeholder,
  value,
  handleChange,
}: InputLabelProps) {
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
}
