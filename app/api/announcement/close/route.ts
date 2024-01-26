export async function PATCH(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];

  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const { id } = await request.json();

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Announcements/${id}?updateMask.fieldPaths=closeAnnouncement`;

  const bodyData = {
    fields: {
      closeAnnouncement: { booleanValue: true },
    },
  };

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const closeAnnouncementRes = await response.json();

    if (closeAnnouncementRes.error) {
      throw new Error(closeAnnouncementRes.error.message);
    }

    return new Response(
      JSON.stringify({
        data: closeAnnouncementRes,
        message: "공고 마감이 되었습니다.",
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
