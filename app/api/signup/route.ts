import type { ClientUser, EducatorUser } from "@/types/user";

export async function POST(request: Request) {
  const data: EducatorUser | ClientUser = await request.json();

  try {
    //회원가입
    const {
      type,
      name,
      email,
      phoneNumber,
      password,
      serviceTermsAccepted,
      privacyPolicyAgreed,
      eventEnabled,
    } = data;

    const firebaseSignupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
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
    const idToken = firebaseAuthData.idToken;

    //TODO: 회원가입 유저 생성 실패시, 해당 에러 문구 return

    const firestoreClientData =
      type === "educator"
        ? {
            fields: {
              type: { stringValue: type },
              name: { stringValue: name },
              email: { stringValue: email },
              phoneNumber: { integerValue: phoneNumber },
              serviceTermsAccepted: { booleanValue: serviceTermsAccepted },
              privacyPolicyAgreed: { booleanValue: privacyPolicyAgreed },
              eventEnabled: { booleanValue: eventEnabled },
              educatorType: {
                arrayValue: {
                  values: data.educatorType.map((value) => ({
                    stringValue: value,
                  })),
                },
              },
              lectureTopic: {
                arrayValue: {
                  values: data.lectureTopic.map((value) => ({
                    stringValue: value,
                  })),
                },
              },
              experience: { integerValue: data.experience.toString() },
            },
          }
        : {
            fields: {
              type: { stringValue: type },
              name: { stringValue: name },
              email: { stringValue: email },
              phoneNumber: { integerValue: phoneNumber },
              serviceTermsAccepted: { booleanValue: serviceTermsAccepted },
              privacyPolicyAgreed: { booleanValue: privacyPolicyAgreed },
              eventEnabled: { booleanValue: eventEnabled },
              managerName: { stringValue: data.managerName },
              managerEmail: { stringValue: data.managerEmail },
              managerPhoneNumber: {
                integerValue: data.managerPhoneNumber,
              },
            },
          };

    const firestoreRes = await fetch(
      `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Users/${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + idToken,
        },
        body: JSON.stringify(firestoreClientData),
      }
    );

    const responseData = await firestoreRes.json();
    console.log(responseData, "응답");

    //TODO: 회원가입 정보 저장 실패시, 에러처리 고민
  } catch (error) {}
}
