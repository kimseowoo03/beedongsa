import type { ClientUser, EducatorUser } from "@/types/user";

export async function POST(request: Request) {
  const data: EducatorUser | ClientUser = await request.json();

  try {
    //회원가입
    const { email, password } = data;
    const firebaseSignupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=APIKEY넣기`,
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
    console.log(firebaseSignupRes, "<<<firebaseSignupRes");
    //firestore에 나머지 정보 저장
  } catch (error) {}
}
