import styled from "@emotion/styled";

const TabList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  gap: var(--gap);
  padding: 10px 0;
`;

const TabItem = styled.li<{ isCurrent: boolean }>`
  button {
    background-color: #fff;
    border: none;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-regular);
    cursor: pointer;
    opacity: ${({ isCurrent }) => (isCurrent ? 1 : 0.5)};
  }
`;

interface TabProps {
  tabTitles: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const Tab = ({ tabTitles, activeTab, setActiveTab }: TabProps) => {
  return (
    <TabList>
      {tabTitles.map((tabTitle: string) => {
        return (
          <TabItem key={tabTitle} isCurrent={tabTitle === activeTab}>
            <button type="button" onClick={() => setActiveTab(tabTitle)}>
              {tabTitle}
            </button>
          </TabItem>
        );
      })}
    </TabList>
  );
};

export default Tab;
