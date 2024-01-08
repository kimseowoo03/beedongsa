export async function POST(request: Request) {
  const data: {
    email: string;
    password: string;
  } = await request.json();

  const { email, password } = data;

  try {
    const firebaseSigninRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const firebaseAuthData = await firebaseSigninRes.json();

    if (firebaseAuthData.error) {
      throw new Error(firebaseAuthData.error.message);
    }

    const refreshToken = firebaseAuthData.refreshToken;

    //TODO: idToken 응답 + Set-Cookie에 refresh Token 저장
    const idToken = firebaseAuthData.idToken;
    return new Response(JSON.stringify({ idToken, message: "로그인 성공" }), {
      status: 200,
      headers: { "Set-Cookie": `refreshToken=${refreshToken}` },
    });
  } catch (error) {
    console.log("---------------------------");
    console.log(error.message);
    console.log("---------------------------");
    return new Response(JSON.stringify({ errorMessage: error.message }), {
      status: 500,
    });
  }
}
