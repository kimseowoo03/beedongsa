import { fetchSomeData } from "@/utils/fetchSomeData";
import { transformFirestoreQueryDocuments } from "@/utils/transformFirestoreQueryDocuments";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseFirestoreQueryProps {
  collectionId: string;
  fieldPath: string;
  value: string | boolean | number;
}
const useFirestoreQuery = ({
  collectionId,
  fieldPath,
  value,
}: UseFirestoreQueryProps) => {
  return useQuery({
    queryKey: ["firestoreData", `${fieldPath}_${value}`],
    queryFn: () => fetchSomeData({ collectionId, fieldPath, value }),
  });
};

export function useTransformedQueryData<T>(
  collectionId: string,
  fieldPath: string,
  value: string | boolean | number
) {
  const { data, isLoading, isSuccess, refetch } = useFirestoreQuery({
    collectionId,
    fieldPath,
    value,
  });

  const queryData = useMemo(() => {
    if (isSuccess && data) {
      return transformFirestoreQueryDocuments<T>(data);
    }
    // 데이터가 없거나 쿼리가 성공하지 않았을 경우 null을 반환
    return null;
  }, [data, isSuccess]);

  return { data: queryData, isLoading, refetch };
}
