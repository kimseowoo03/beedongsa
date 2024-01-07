export async function POST(request: Request) {
  const data: {
    email: string;
    password: string;
  } = await request.json();

  const { email, password } = data;
  console.log("로그인 api");
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

    console.log("---------firebaseAuthData---------");
    console.log(firebaseAuthData);
    console.log("---------firebaseAuthData---------");

    if (firebaseAuthData.error) {
      throw new Error(firebaseAuthData.error.message);
    }

    //TODO: 1. 로그인시 HTTP-only 쿠키에 refreshToken 저장
    const refreshToken = firebaseAuthData.refreshToken;
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=3600; Secure`
    );

    //TODO: 2. idToken 응답
    const idToken = firebaseAuthData.idToken;
    return new Response(JSON.stringify({ idToken, message: "로그인 성공" }), {
      status: 200,
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
