import styled from "@emotion/styled";

export const BackgroundModal = styled.div`
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 105;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 110;
  padding: 40px;
  border-radius: 16px;
  box-sizing: border-box;
  letter-spacing: -1px;
  background-color: var(--white);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  transform: translateY(-50%) translateX(-50%) translateZ(0);
`;

export const Buttons = styled.div`
  display: flex;
  gap: var(--gap-02);
  position: fixed;
  bottom: 40px;
  width: calc(100% - 80px);
  left: 50%;
  transform: translateX(-50%);
`;
