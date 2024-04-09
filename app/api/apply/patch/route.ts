import { ApplyWithID } from "@/types/apply";
import { transformToFirestoreFormat } from "@/utils/transformFirebaseFormat";

export async function PATCH(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];

  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const { applyID, ...restData }: ApplyWithID = await request.json();

  const firestoreClientData = transformToFirestoreFormat(restData);

  try {
    const firestoreApplyPatchRes = await fetch(
      `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Apply/${applyID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(firestoreClientData),
      }
    );

    const firestoreApplyPatchData = await firestoreApplyPatchRes.json();

    if (firestoreApplyPatchData.error) {
      throw new Error(firestoreApplyPatchData.error.message);
    }

    return new Response(
      JSON.stringify({
        data: firestoreApplyPatchData,
        message: "최종매칭 확인",
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
