import styled from "@emotion/styled";

const ButtonWrap = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: var(--primary-color-y);
  border: none;

  font-size: var(--font-size-xxs);
  color: var(--font-color-1);
  font-weight: var(--font-weight-bold);
  cursor: pointer;

  &:disabled {
    color: #fff;
    background: var(--gray-sub1);
    cursor: not-allowed;
  }
`;

interface ButtonProps {
  text: string;
  type: "submit" | "button";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ text, type, disabled, onClick }: ButtonProps) {
  return (
    <ButtonWrap type={type} disabled={disabled} onClick={onClick}>
      {text}
    </ButtonWrap>
  );
}
