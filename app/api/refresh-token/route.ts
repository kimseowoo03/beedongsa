// export async function POST(request: Request) {
//   const newHeaders = new Headers(request.headers);
//   // const refreshToken = request.cookies["refreshToken"];

// Firebase에 refreshToken을 사용하여 새 idToken 요청
// const firebaseResponse = await fetch(
//   `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ refreshToken }),
//   }
// );

// const firebaseData = await firebaseResponse.json();

//   return new Response(JSON.stringify({ idToken: firebaseData.idToken }), {
//     status: 200,
//   });
// }
