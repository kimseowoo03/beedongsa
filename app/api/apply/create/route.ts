import type { Apply } from "@/types/apply";
import { transformToFirestoreFormat } from "@/utils/transformFirebaseFormat";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];
  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const data: Apply = await request.json();

  const firestoreClientData = transformToFirestoreFormat(data);

  try {
    const firestoreInquiriesRes = await fetch(
      `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Apply/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(firestoreClientData),
      }
    );

    const firestoreInquiriesData = await firestoreInquiriesRes.json();

    if (firestoreInquiriesData.error) {
      throw new Error(firestoreInquiriesData.error.message);
    }

    return new Response(
      JSON.stringify({
        data: firestoreInquiriesData,
        message: "지원하기 완료",
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
