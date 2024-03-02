import { useState } from "react";

import styled from "@emotion/styled";

import InquiriesListItem, {
  ListItem,
} from "@/components/Molecules/InquiriesListItem";

import type { InquiriesQuery } from "@/types/inquiries";

const List = styled.ul`
  list-style: none;
`;

type TabType = "outgoing" | "incoming";

interface InquiriesListProps {
  outgoingInquiriesQuery: InquiriesQuery;
  receivingInquiriesQuery: InquiriesQuery;
}
const InquiriesList = ({
  outgoingInquiriesQuery,
  receivingInquiriesQuery,
}: InquiriesListProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("outgoing");

  const {
    isLoading,
    refetch,
    data: inquiriesData,
  } = selectedTab === "outgoing"
    ? outgoingInquiriesQuery
    : receivingInquiriesQuery;

  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab);
    refetch();
  };

  const renderInquiries = (data) => {
    return data ? (
      data.map(({ id, data }, index) => (
        <InquiriesListItem key={id + String(index)} {...data} />
      ))
    ) : (
      <div>데이터가 없습니다.</div>
    );
  };

  return (
    <>
      <div>
        <button onClick={() => handleTabClick("outgoing")}>
          <span>
            발신{" "}
            <span>
              {outgoingInquiriesQuery.data
                ? outgoingInquiriesQuery.data.length
                : 0}
            </span>
          </span>
        </button>
        <button onClick={() => handleTabClick("incoming")}>
          <span>
            수신{" "}
            <span>
              {receivingInquiriesQuery.data
                ? receivingInquiriesQuery.data.length
                : 0}
            </span>
          </span>
        </button>
      </div>

      <List>
        <ListItem>
          <p>날짜</p>
          <p>수신자</p>
          <p>제목</p>
          <p>발신자</p>
          <p>상태</p>
        </ListItem>

        {isLoading ? (
          <div>데이터 가져오는 중...</div>
        ) : (
          renderInquiries(inquiriesData)
        )}
      </List>
    </>
  );
};

export default InquiriesList;
