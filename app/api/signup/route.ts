import type { ClientUser, EducatorUser } from "@/types/user";

export async function POST(request: Request) {
  const data: EducatorUser | ClientUser = await request.json();

  try {
    //회원가입
    const { email, password } = data;

    const firebaseSignupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkZrKQK9k1rHIEPjzs9Cd59o-pnWtt6dY`,
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
    const firebaseAuthData = await firebaseSignupRes.json();
    console.log(firebaseAuthData, "firebaseAuthData");
    const idToken = firebaseAuthData.idToken;

    const firestoreData = {
      fields: {
        fieldName1: { stringValue: "some tesdwqwxt" },
      },
    };

    console.log(idToken, "토큰 챙김");
    const firestoreRes = await fetch(
      `https://firestore.googleapis.com/v1/projects/beedongsa/databases/(default)/documents/users/${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + idToken,
        },
        body: JSON.stringify(firestoreData),
      }
    );
    const res = await firestoreRes.json();
    console.log(res, "firestoreRes");
  } catch (error) {}
}
