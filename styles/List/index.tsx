import styled from "@emotion/styled";

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--font-color-1);

  cursor: pointer;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
`;

export const TextItem = styled.li`
  > div:first-of-type {
    width: 140px;
    display: inline-block;
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-bold);
    color: var(--font-color-1);
  }
  > div:last-of-type {
    display: inline-block;
    font-size: var(--font-size-xxs);
    color: var(--gray-sub2);
  }
`;

export const ArrayItem = styled.li`
  > div:first-of-type {
    width: 140px;
    display: inline-block;
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-bold);
    color: var(--font-color-1);
  }
  > div:last-of-type {
    display: inline-flex;
    flex-direction: column;
    gap: 6px;
    font-size: var(--font-size-xxs);
    color: var(--gray-sub2);
  }
`;
