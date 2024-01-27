/**
 *Firebase 문서의 fields 객체를 변환하여 지정된 타입의 객체로 반환합니다.
 *
 * @param fields Firebase 문서에서 응답받은 fields 객체
 * @returns T 타입으로 지정된 객체
 */
export const transformFirestoreDocument = <T>(fields: any) => {
  let transformedObject = {};

  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    if (value.hasOwnProperty("stringValue")) {
      transformedObject[key] = value.stringValue;
    } else if (value.hasOwnProperty("booleanValue")) {
      transformedObject[key] = value.booleanValue;
    } else if (value.hasOwnProperty("integerValue")) {
      transformedObject[key] = parseInt(value.integerValue, 10);
    } else if (value.hasOwnProperty("arrayValue")) {
      transformedObject[key] = value.arrayValue.values
        ? value.arrayValue.values.map((item: any) => item.stringValue)
        : [];
    }
  });

  return transformedObject as T;
};
