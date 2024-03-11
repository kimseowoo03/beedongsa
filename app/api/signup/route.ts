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

    //1. 이메일, 비밀번호 가입
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

    if (firebaseAuthData.error) {
      throw new Error(firebaseAuthData.error.message);
    }

    //2. 유저이름 auth에 업데이트
    const userNameUpdateRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
          displayName: name,
          returnSecureToken: true,
        }),
      }
    );

    const userNameUpdate = await userNameUpdateRes.json();

    if (userNameUpdate.error) {
      throw new Error(userNameUpdate.error.message);
    }

    //3. 유저정보 Firestore에 업데이트
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
              experience: { integerValue: 0 },
              experienceRecord: {
                arrayValue: {
                  values: data.experienceRecord,
                },
              },
              certificate: {
                arrayValue: {
                  values: data.certificate,
                },
              },
              etcRecord: {
                arrayValue: {
                  values: data.etcRecord,
                },
              },
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

    const userID = email.split("@")[0];

    const firestoreRes = await fetch(
      `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Users/${userID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + idToken,
        },
        body: JSON.stringify(firestoreClientData),
      }
    );

    const firestoreUserDataRes = await firestoreRes.json();

    if (firestoreUserDataRes.error) {
      throw new Error(firestoreUserDataRes.error.message);
    }

    return new Response(JSON.stringify({ message: "회원가입성공" }), {
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
