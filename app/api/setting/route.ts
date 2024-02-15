import { transformToFirestoreFormat } from "@/utils/transformFirebaseFormat";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];
  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const { values, userID } = await request.json();

  //1. pdf 저장
  // 2. 유저 정보 업데이트

  const firestoreBodyData = transformToFirestoreFormat(values);

  try {
    const firestoreRes = await fetch(
      `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Users/${userID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(firestoreBodyData),
      }
    );

    const firestoreUserDataRes = await firestoreRes.json();
    console.log("---------Setting-----------");
    console.log(firestoreBodyData);
    console.log("---------Setting-----------");

    if (firestoreUserDataRes.error) {
      throw new Error(firestoreUserDataRes.error.message);
    }

    return new Response(
      JSON.stringify({
        data: firestoreUserDataRes,
        message: "정보 저장 완료",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ errorMessage: error.message }), {
      status: 500,
    });
  }
}
