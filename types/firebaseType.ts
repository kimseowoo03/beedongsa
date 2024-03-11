export interface FirebaseDocument {
  name: string;
  fields: object;
  createTime: string;
  updateTime: string;
}

export interface firestoreQueryDocumentResData<T> {
  id: string;
  data: T;
  createTime: string;
}
