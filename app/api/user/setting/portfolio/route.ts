export async function POST(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];
  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const formData = await request.formData();
  const files: File[] = [];
  formData.forEach((value, key) => {
    if (key === "files" && value instanceof File) {
      files.push(value);
    }
  });

  try {
    const firestoreRes = await fetch(
      `https://firebasestorage.googleapis.com/v1beta/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/buckets/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/objects?uploadType=media`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: files[0].name,
          contentType: files[0].type,
          file: files[0],
        }),
      }
    );
    const firestoreUserDataRes = await firestoreRes.json();
    console.log(
      "------------------------console.log(firestoreRes)console.log(firestoreRes)console.log(firestoreRes)console.log(firestoreRes)"
    );
    console.log(firestoreUserDataRes);

    if (firestoreUserDataRes.error) {
      throw new Error(firestoreUserDataRes.error.message);
    }

    console.log(firestoreUserDataRes, "<<firestoreUserDataRes");

    return new Response(
      JSON.stringify({
        data: "",
        message: "업로드 완료",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
