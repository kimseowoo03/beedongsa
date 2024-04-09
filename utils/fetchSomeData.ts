interface FetchSomeDataProps {
  collectionId: string;
  fieldPath: string;
  value: string | boolean | number;
}
/**
 * Firestore에서 특정 조건에 맞는 데이터를 조회하는 비동기 함수입니다.
 * 이 함수는 Firestore의 REST API를 사용하여 지정된 컬렉션에서
 * 특정 필드와 값으로 필터링된 데이터를 불러옵니다.
 *
 * @param {FetchSomeDataProps} { collectionId, fieldPath, value } - 조회할 데이터의 정보를 담은 객체
 *   - `collectionId`: 조회할 Firestore 컬렉션의 ID
 *   - `fieldPath`: 조회 조건으로 사용할 문서의 필드 경로
 *   - `value`: 조회 조건으로 사용할 필드의 값
 * @returns Firestore 쿼리 실행 결과를 포함한 Promise 객체. 성공 시 결과 데이터, 실패 시 null 반환
 */
export async function fetchSomeData({
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
