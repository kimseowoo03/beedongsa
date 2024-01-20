"use client";

import styled from "@emotion/styled";

const NoticeBarWrap = styled.div`
  width: 100%;
  padding: 8px 0;
  text-align: center;
  background-color: var(--primary-color-y);
  color: var(--font-color-1);
  font-size: var(--font-size-xxs);
`;

interface NoticeBarProps {
  children: React.ReactNode;
}
export default function NoticeBar({ children }: NoticeBarProps) {
  return <NoticeBarWrap>{children}</NoticeBarWrap>;
}
