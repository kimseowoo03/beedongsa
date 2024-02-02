"use client";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { HiOutlineChevronLeft } from "react-icons/hi2";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid var(--gray-sub1);

  //상단 고정
  position: sticky;
  z-index: 10;
  top: 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  > svg {
    width: 24px;
    height: 24px;
  }
`;

export const ActionBox = styled.div`
  display: flex;
`;

interface ContentActionBarProps {
  children: React.ReactNode;
}
export const ContentActionBar = ({ children }: ContentActionBarProps) => {
  const router = useRouter();

  return (
    <Wrap>
      <BackButton type="button" onClick={() => router.back()}>
        <HiOutlineChevronLeft />
      </BackButton>
      {children}
    </Wrap>
  );
};
