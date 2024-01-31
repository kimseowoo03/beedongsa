import { Announcement } from "@/types/announcement";
import { transformToFirestoreFormat } from "@/utils/transformFirebaseFormat";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];
  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const data: Announcement = await request.json();
  console.log(data, "<<POSTSTSSTST");

  const firestoreClientData = transformToFirestoreFormat(data);
  console.log(firestoreClientData);
  try {
    const firestoreAnnouncementsRes = await fetch(
      `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Announcements/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(firestoreClientData),
      }
    );

    const firestoreAnnouncementsData = await firestoreAnnouncementsRes.json();

    if (firestoreAnnouncementsData.error) {
      throw new Error(firestoreAnnouncementsData.error.message);
    }

    return new Response(
      JSON.stringify({
        data: firestoreAnnouncementsData,
        message: data.temporaryStorage ? "임시 저장 완료" : "공고 등록 완료",
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
