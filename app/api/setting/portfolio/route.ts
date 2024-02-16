import { transformToFirestoreFormat } from "@/utils/transformFirebaseFormat";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];
  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const data = await request.formData();

  console.log("files ----------------------------------------");
  console.log(data);

  try {
    // const firestoreRes = await fetch(
    //   `https://storage.googleapis.com/upload/storage/v1/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o?uploadType=media&name=portfolio`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/octet-stream',
    //     },
    //     body: data,
    //   }
    // );
    // const firestoreUserDataRes = await firestoreRes.json();
    // console.log("---------Setting-----------");
    // console.log(firestoreBodyData);
    // console.log("---------Setting-----------");
    // if (firestoreUserDataRes.error) {
    //   throw new Error(firestoreUserDataRes.error.message);
    // }
    // return new Response(
    //   JSON.stringify({
    //     data: firestoreUserDataRes,
    //     message: "정보 저장 완료",
    //   }),
    //   {
    //     status: 200,
    //   }
    // );
  } catch (error) {
    return new Response(JSON.stringify({ errorMessage: error.message }), {
      status: 500,
    });
  }
}
