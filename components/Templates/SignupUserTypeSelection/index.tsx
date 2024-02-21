/**상태관리 */
import { useSetAtom } from "jotai";
import { signupPageNextAtom } from "@/atoms/signup/action";

/**style */
import styled from "@emotion/styled";
import ClientSVG from "@/public/image/client.svg";
import EducatorSVG from "@/public/image/educator.svg";

/**type */
import type { UserType } from "@/types/user";

const Wrap = styled.div`
  max-width: 552px;
`;
const TypeCardWrap = styled.div`
  display: flex;
  gap: var(--gap);
`;

const TypeCard = styled.div`
  /* max-width: 320px;
  width: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 40px 25px;
  border-radius: var(--border-radius);
  border: 2px solid var(--gray-03);
  background: #fff;
  transition: border 0.2s ease;

  &:hover {
    cursor: pointer;
    border: 2px solid var(--font-color-2);
  }

  .typeTitle {
    color: var(--font-color1);
    text-align: center;
    font-size: var(--font-size-s);
    font-weight: var(--font-weight-bold);

    margin-bottom: 10px;
  }
  .typeDescription {
    max-width: 214px;
    width: 100%;
    color: var(--gray-06);
    text-align: center;
    font-size: var(--font-size-xxx);
    font-weight: var(--font-weight-normal);
    line-height: 18px;
  }
`;

export const SignupUserTypeSelection = ({
  updateUserType,
}: {
  updateUserType: (userType: UserType) => void;
}) => {
  const next = useSetAtom(signupPageNextAtom);

  const CardClickHandler = (selectedUserType: UserType) => {
    //선택된 사용자 유형 업데이트 후, 다음 단계 action 호출
    updateUserType(selectedUserType);
    next();
  };
  return (
    <Wrap>
      <p className="title">원하는 유형을 선택하여 가입하세요!</p>
      <p className="description">선택된 유형으로 가입시 변경할 수 없습니다.</p>
      <TypeCardWrap>
        <TypeCard onClick={() => CardClickHandler("educator")}>
          <EducatorSVG />
          <div className="typeContent">
            <p className="typeTitle">강사/컨설턴트 가입</p>
            <p className="typeDescription">
              강사/컨설턴트로 가입해서 강사/컨설팅 등록과 1:1 매칭 혜택을
              만나보세요!
            </p>
          </div>
        </TypeCard>
        <TypeCard onClick={() => CardClickHandler("client")}>
          <ClientSVG />
          <div>
            <p className="typeTitle">클라이언트 가입</p>
            <p className="typeDescription">
              클라이언트로 가입해서 공고 등록과 1:1 매칭 혜택을 만나보세요!
            </p>
          </div>
        </TypeCard>
      </TypeCardWrap>
    </Wrap>
  );
};
