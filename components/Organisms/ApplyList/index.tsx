import { ApplyListItem } from "@/components/Molecules/ApplyListItem";
import { ApplyQuery } from "@/types/apply";

export const ApplyList = ({ data, isLoading, refetch }: ApplyQuery) => {
  return (
    <ul>
      {data.map(({ data, id }) => {
        return <ApplyListItem key={id} {...data} id={id} />;
      })}
    </ul>
  );
};
