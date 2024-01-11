export async function POST(request: Request) {
  const email = await request.json();

  try {
    const firebaseSendResetPasswordRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email,
        }),
      }
    );

    const firebaseSendResetPasswordData =
      await firebaseSendResetPasswordRes.json();

    if (firebaseSendResetPasswordData.error) {
      throw new Error(firebaseSendResetPasswordData.error.message);
    }

    return new Response(
      JSON.stringify({ message: "비밀번호 초기화 이메일 발송 성공" }),
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
