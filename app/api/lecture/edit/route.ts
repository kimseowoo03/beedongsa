import { Lecture } from "@/types/lecture";
import { transformToFirestoreFormat } from "@/utils/transformFirebaseFormat";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];
  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const data: Lecture & { id: string } = await request.json();

  const firestoreBodyData = transformToFirestoreFormat(data);

  try {
    const firestoreAnnouncementsRes = await fetch(
      `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Lectures/${data.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(firestoreBodyData),
      }
    );

    const firestoreAnnouncementsData = await firestoreAnnouncementsRes.json();
    console.log("---------Lectures-----------");
    console.log(firestoreBodyData);
    console.log("---------Lectures-----------");

    if (firestoreAnnouncementsData.error) {
      throw new Error(firestoreAnnouncementsData.error.message);
    }

    return new Response(
      JSON.stringify({
        data: firestoreAnnouncementsData,
        message: "강의 수정 완료",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("---------------------------");
    console.log(error.message);
    console.log("---------------------------");
    return new Response(JSON.stringify({ errorMessage: error.message }), {
      status: 500,
    });
  }
}
