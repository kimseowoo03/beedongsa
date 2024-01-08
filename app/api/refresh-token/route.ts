export async function POST(request: Request) {
  try {
    //TODO: Firebase에 refreshToken을 사용하여 새 idToken 요청
    const { refreshToken } = await request.json();
    console.log("---------->>>>>>>>>>>>>>", refreshToken);

    const firebaseResponse = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ grant_type: "refresh_token", refreshToken }),
      }
    );

    const refreshResponseData = await firebaseResponse.json();
    console.log("-------------firebaseRefreshData--------------");
    console.log(refreshResponseData);
    console.log("------------firebaseRefreshData---------------");

    if (refreshResponseData.error) {
      throw new Error(refreshResponseData.error.message);
    }

    const newRefreshToken = refreshResponseData.refresh_token;
    const idToken = refreshResponseData.id_token;

    return new Response(
      JSON.stringify({ idToken, message: "idToken 재발급 성공" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `refreshToken=${newRefreshToken}; Max-Age=${
            7 * 24 * 60 * 60
          }; Path=/;`,
        },
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
