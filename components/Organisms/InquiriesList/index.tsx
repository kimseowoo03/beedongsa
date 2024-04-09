import { useState } from "react";

import styled from "@emotion/styled";

import InquiriesListItem, {
  ListItem,
} from "@/components/Molecules/InquiriesListItem";

import {
  useOutgoingInquiriesQuery,
  useReceivingInquiriesQuery,
} from "@/hooks/[userID]/useInquiryQueries";

const List = styled.ul`
  list-style: none;
`;

type TabType = "outgoing" | "incoming";

const InquiriesList = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("outgoing");

  const outgoingInquiriesQuery = useOutgoingInquiriesQuery();
  const receivingInquiriesQuery = useReceivingInquiriesQuery();

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
        <InquiriesListItem key={id + String(index)} {...data} id={id} />
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
