import styled from "@emotion/styled";
import { createContext, useContext, useState } from "react";

const TabListWrap = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  gap: var(--gap);
  padding: 10px 0;
`;

const TabTriggerWrap = styled.li<{ isCurrent: boolean }>`
  button {
    background-color: #fff;
    border: none;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-regular);
    cursor: pointer;
    opacity: ${({ isCurrent }) => (isCurrent ? 1 : 0.5)};
  }
`;

const TabPanelWrap = styled.div``;

const TabsContext = createContext({
  activeTab: "",
  setActiveTab: (value: string) => {},
});

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}
const TabsMain = ({ defaultValue, children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

interface TabListProps {
  children: React.ReactNode;
}
const TabList = ({ children }: TabListProps) => {
  return <TabListWrap>{children}</TabListWrap>;
};

interface TabTriggerProps {
  value: string;
}
const TabTrigger = ({ value }: TabTriggerProps) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <TabTriggerWrap isCurrent={value === activeTab}>
      <button type="button" onClick={() => setActiveTab(value)}>
        {value}
      </button>
    </TabTriggerWrap>
  );
};

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
}
const TabPanel = ({ value, children }: TabPanelProps) => {
  const { activeTab } = useContext(TabsContext);

  if (value !== activeTab) {
    return null;
  }

  return <TabPanelWrap>{children}</TabPanelWrap>;
};

export const Tabs = Object.assign(TabsMain, {
  List: TabList,
  Trigger: TabTrigger,
  Panel: TabPanel,
});
