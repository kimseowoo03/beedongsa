export async function PATCH(request: Request, { params }) {
  const token = request.headers.get("Authorization").split(" ")[1];

  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const { inquiryId } = params;
  const answerContent = await request.json();

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default)/documents/Inquiries/${inquiryId}?updateMask.fieldPaths=answerContent`;

  const bodyData = {
    fields: {
      answerContent: { stringValue: answerContent },
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

    const answerUpdateRes = await response.json();

    if (answerUpdateRes.error) {
      throw new Error(answerUpdateRes.error.message);
    }

    return new Response(
      JSON.stringify({
        data: answerUpdateRes,
        message: "답변을 등록했습니다.",
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
