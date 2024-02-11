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
  gap: 20px;
  list-style: none;
`;

export const ItemColum = styled.li`
  display: flex;
  flex-direction: column;
  gap: 6px;

  > div:first-of-type {
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-bold);
    color: var(--font-color-1);
  }
  > div:last-of-type {
    flex-direction: column;
    gap: 6px;
    font-size: var(--font-size-xxs);
    color: var(--gray-sub2);
  }
`;

export const Item = styled.li`
  display: flex;

  > div:first-of-type {
    width: 140px;
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-bold);
    color: var(--font-color-1);
  }
  > div:last-of-type {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: var(--font-size-xxs);
    color: var(--gray-sub2);
  }
`;
