import styled from "@emotion/styled";

export const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--font-color-1);
`;

export const ListHeaderActions = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ListTitle = styled.p`
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-bold);
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
    color: var(--gray-06);
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
    color: var(--gray-06);
  }
`;

export const DateItem = styled.li`
  display: flex;

  > div:first-of-type {
    width: 180px;
    font-size: var(--font-size-xxs);
    color: var(--gray-06);
  }
  > div:last-of-type {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-bold);
    color: var(--font-color-1);
  }
`;
