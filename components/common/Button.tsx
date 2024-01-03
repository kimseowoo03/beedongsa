import styled from "@emotion/styled";

const ButtonWrap = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: 16px 24px;
  border-radius: 10px;
  background: var(--primary-color-y);
  border: none;

  font-size: var(--font-size-xs);
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
  type: "submit";
  disabled: boolean;
}

const Button = ({ text, type, disabled }: ButtonProps) => {
  return (
    <ButtonWrap type={type} disabled={disabled}>
      {text}
    </ButtonWrap>
  );
};

export default Button;
