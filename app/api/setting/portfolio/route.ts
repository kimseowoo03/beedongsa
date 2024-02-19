export async function POST(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];
  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  // token으로 유저의 정보를 가져와 email에서 userID를 구한다
  const formData = await request.formData();

  try {
    const userDataRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
        }),
      }
    );

    const userData = await userDataRes.json();

    if (userData.error) {
      throw new Error(userData.error.message);
    }

    const userID = userData.users[0].email.split("@")[0];

    const filePromises = Array.from(formData.entries()).map(
      async ([key, value]) => {
        console.log(key, value, "<<<현재 파일");
        if (key === "files" && value instanceof File) {
          const url = `https://firebasestorage.googleapis.com/v0/b/${
            process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
          }/o?uploadType=media&name=${encodeURIComponent(
            `${userID}/portfolio/${value.name}`
          )}`;

          try {
            const firestoreRes = await fetch(url, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": value.type,
              },
              body: value,
            });

            const firestoreUserDataRes = await firestoreRes.json();
            console.log(firestoreUserDataRes, "<<<<<<<<firestoreUserDataRes");

            return firestoreUserDataRes; // Returning the response for each file
          } catch (error) {
            console.error(`업로드 실패한 파일명: ${value.name}`, error);
            return { error: error.message };
          }
        }
      }
    );

    const responses = await Promise.all(filePromises);

    const errorResponse = responses.find((res) => res && res.error);

    if (errorResponse) {
      throw new Error(errorResponse.error);
    }

    console.log(responses, "<<responses");

    return new Response(
      JSON.stringify({
        data: responses,
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
