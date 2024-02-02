import { transformFirestoreDocument } from "./transformFirebaseDocument";

/**
 * Firestore에서 받은 1개 이상의 문서 데이터를 변환하여 새로운 배열을 만듭니다.
 *
 * @param documents Firestore에서 응답받은 문서 데이터 배열
 * @returns 각 문서에 대한 객체 배열. 각 객체는 다음을 포함합니다:
 *          id - 문서의 고유 ID
 *          data - 변환된 데이터 객체, T 타입
 */
export const transformFirestoreArrayDocuments = <T>(
  documents: any[]
): { id: string; data: T; createTime: string }[] => {
  return documents.map((doc) => {
    const docData = doc.document;
    const transformedObject = transformFirestoreDocument<T>(docData.fields);
    const docId = docData.name.split("/").pop();

    const formattedDate: string = docData.createTime
      .replace("T", " ")
      .replace(/\.\d+Z$/, "");
    return {
      id: docId,
      data: transformedObject,
      createTime: formattedDate,
    };
  });
};
