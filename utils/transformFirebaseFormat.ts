/**
 * 이 함수는 주어진 초기 값 객체를 Firebase Firestore 요청의 바디 데이터 형식으로 변환
 * @param {Object} initialValues - 변환할 초기 값 객체
 * @returns {Object} - Firestore 요청의 바디 데이터 형식으로 변환된 객체
 */
export function transformToFirestoreFormat(initialValues: {}) {
  const firestoreFormat = {};

  for (const key in initialValues) {
    const value = initialValues[key];

    if (value !== undefined) {
      if (typeof value === "string") {
        firestoreFormat[key] = { stringValue: value };
      } else if (typeof value === "number") {
        firestoreFormat[key] = { integerValue: value };
      } else if (typeof value === "boolean") {
        firestoreFormat[key] = { booleanValue: value };
      } else if (Array.isArray(value)) {
        firestoreFormat[key] = {
          arrayValue: {
            values: value.map((element) => ({ stringValue: element })),
          },
        };
      }
      // 추가적인 데이터 타입에 대한 처리를 여기에 추가할 수 있습니다.
    }
  }

  return { fields: firestoreFormat };
}
