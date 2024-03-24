import styled from "@emotion/styled";
import { BackgroundModal, ModalWrap } from "@/styles/Modal";

import { useAtom, useAtomValue } from "jotai";
import { applyStatusAtom, applyStatusModalAtom } from "@/atoms/modal";

const Wrap = styled(ModalWrap)`
  width: 320px;
  height: 330px;
`;

export const ApplyStatusModal = () => {
  const [applyStatusModal, setApplyStatusModal] = useAtom(applyStatusModalAtom);
  const applyStatus = useAtomValue(applyStatusAtom);

  if (!applyStatusModal) {
    return;
  }

  console.log(applyStatus, "<<<매칭 상태");

  return (
    <>
      <Wrap>
        <p>지원하기 : {applyStatus.sentStatus ? "O" : "X"}</p>
        <p>지원확인 : {applyStatus.responseStatus ? "O" : "X"}</p>
        <p>최종매칭 : {applyStatus.matchConfirmationStatus ? "O" : "X"}</p>

        <button type="button" onClick={() => setApplyStatusModal(() => false)}>
          확인
        </button>
      </Wrap>
      <BackgroundModal />
    </>
  );
};
