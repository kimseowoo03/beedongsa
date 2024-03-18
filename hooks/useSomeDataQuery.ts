import { useQuery } from "@tanstack/react-query";

interface FetchSomeDataProps {
  collectionId: string;
  fieldPath: string;
  value: string | boolean | number;
}
async function fetchSomeData({
  collectionId,
  fieldPath,
  value,
}: FetchSomeDataProps) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents:runQuery`;

  const getValueType = (value: string | boolean | number) => {
    if (typeof value === "string") {
      return { stringValue: value };
    } else if (typeof value === "boolean") {
      return { booleanValue: value };
    } else if (typeof value === "number") {
      return { integerValue: value };
    } else {
      throw new Error("Unsupported value type");
    }
  };

  const query = {
    structuredQuery: {
      from: [{ collectionId }],
      where: {
        fieldFilter: {
          field: { fieldPath },
          op: "EQUAL",
          value: getValueType(value),
        },
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(query),
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching approved lectures:", error);
    return null;
  }
}

export const useSomeDataQuery = ({
  collectionId,
  fieldPath,
  value,
}: FetchSomeDataProps) => {
  return useQuery({
    queryKey: ["someData", `${fieldPath}_${value}`],
    queryFn: () =>
      fetchSomeData({
        collectionId,
        fieldPath,
        value,
      }),
  });
};
