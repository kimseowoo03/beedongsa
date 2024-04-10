import { ApplyListItem } from "@/components/Molecules/ApplyListItem";
import { useApplyQuery } from "@/hooks/[userID]/useApplyQuery";

export const ApplyList = () => {
  const { data, isLoading } = useApplyQuery();

  if (!data) {
    return <p>지원내역이 없습니다.</p>;
  }
  return (
    <ul>
      {data.map(({ data, id }) => {
        return <ApplyListItem key={id} {...data} id={id} />;
      })}
    </ul>
  );
};
