import { transformToFirestoreFormat } from "@/utils/transformFirebaseFormat";

export async function PATCH(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];

  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const { userID, value } = await request.json();

  const portfoilosData = transformToFirestoreFormat({ portfolios: value });

  const url = `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Users/${userID}?updateMask.fieldPaths=portfolios`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfoilosData),
    });

    const resData = await response.json();

    if (resData.error) {
      throw new Error(resData.error.message);
    }

    return new Response(
      JSON.stringify({
        data: resData,
        message: "파일 업데이트 완료.",
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
