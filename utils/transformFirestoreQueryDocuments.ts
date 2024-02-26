import { transformFirestoreDocument } from "./transformFirebaseDocument";

export interface FirestoreDocument {
  document: {
    name: string;
    fields: object;
    createTime: string;
    updateTime: string;
  };
  readTime: string;
}

/**
 * Firestore에서 쿼리로 여러 개의 문서 데이터를 조회한 후 응답받은 데이터를 변환하여 새로운 배열을 만듭니다.
 *
 * @param queryResponse Firestore에서 쿼리 조회 후 응답받은 데이터
 * @returns 각 문서에 대한 객체 배열. 각 객체는 다음을 포함합니다:
 *          id - 문서의 고유 ID
 *          data - 변환된 데이터 객체, T 타입
 *          createTime - 문서의 생성 시간
 */
export const transformFirestoreQueryDocuments = <T>(
  queryResponse: FirestoreDocument[]
): { id: string; data: T; createTime: string }[] | null => {
  if (!queryResponse[0].document) {
    return null;
  }

  return queryResponse.map(({ document }) => {
    const transformedData = transformFirestoreDocument<T>(document.fields);
    const docId = document.name.split("/").pop();

    const formattedDate: string = document.createTime
      .replace("T", " ")
      .replace(/\.\d+Z$/, "");

    return {
      id: docId,
      data: transformedData,
      createTime: formattedDate,
    };
  });
};
