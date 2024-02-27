import styled from "@emotion/styled";

const Wrap = styled.button`
  width: 100%;
  height: 40px;
  background-color: var(--gray-02);
  border-radius: var(--border-radius);
  border: none;

  color: var(--font-color-1);
  font-size: var(--font-size-xxs);
  font-weight: var(--font-weight-bold);

  cursor: pointer;
`;

interface CancelButtonProps {
  cancelHandler: () => void;
}
export const CancelButton = ({ cancelHandler }: CancelButtonProps) => {
  return (
    <Wrap onClick={cancelHandler}>
      <span>취소</span>
    </Wrap>
  );
};
