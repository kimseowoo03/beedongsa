import { transformFirestoreDocument } from "./transformFirebaseDocument";
import type { FirebaseDocument } from "@/types/firebaseType";
/**
 * Firestore에서 데이터들을 받아올 때 변환하여 새로운 배열을 만듭니다.
 *
 * @param resData Firestore에서 여러개 조회한 후 응답받은 데이터
 * @returns 각 문서에 대한 객체 배열. 각 객체는 다음을 포함합니다:
 *          id - 문서의 고유 ID
 *          data - 변환된 데이터 객체, T 타입
 */
export const transformFirestoreArrayDocuments = <T>(resData: {
  documents: FirebaseDocument[];
}): { id: string; data: T; createTime: string }[] | null => {
  if (!resData.documents) {
    return null;
  }

  return resData.documents.map((doc) => {
    const docData = doc.fields;
    const transformedObject = transformFirestoreDocument<T>(docData);
    const docId = doc.name.split("/").pop();

    const formattedDate: string = doc.createTime
      .replace("T", " ")
      .replace(/\.\d+Z$/, "");

    return {
      id: docId,
      data: transformedObject,
      createTime: formattedDate,
    };
  });
};
