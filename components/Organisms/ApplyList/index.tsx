import { ApplyListItem } from "@/components/Molecules/ApplyListItem";
import { useApplyQuery } from "@/hooks/[userID]/useApplyQuery";

export const ApplyList = () => {
  const { data, isLoading } = useApplyQuery();

  return (
    <ul>
      {data.map(({ data, id }) => {
        return <ApplyListItem key={id} {...data} id={id} />;
      })}
    </ul>
  );
};
