/**
 * 1. Announcement 정보 저장
 * 2. Announcement 고유 ID 해당 이메일 유저 정보에
 */
import { Announcement } from "@/types/announcement";

export async function POST(request: Request) {
  const data: Announcement = await request.json();
  console.log(data, "<<POSTSTSSTST");
  try {
    // const {
    // } = data;
    // const firestoreClientData ={
    //   fields: {
    //     registeredEmail: { stringValue: registeredEmail },
    //     title: { stringValue: title },
    //     category: {
    //       arrayValue: {
    //         values: category.map((value) => ({ stringValue: value })),
    //       },
    //     },
    //     metropolitanCity: { stringValue: metropolitanCity },
    //     district: { stringValue: district },
    //     detailedAddress: { stringValue: detailedAddress },
    //     schedule: {
    //       arrayValue: {
    //         values: schedule.map((value) => ({ stringValue: value })),
    //       },
    //     },
    //     recruitmentDeadline: { stringValue: recruitmentDeadline },
    //     target: {
    //       arrayValue: {
    //         values: target.map((value) => ({ stringValue: value })),
    //       },
    //     },
    //     personnel: { integerValue: personnel.toString() },
    //     totalCost: { integerValue: totalCost.toString() },
    //     supportIncludedInTheCost: {
    //       arrayValue: {
    //         values: supportIncludedInTheCost.map((value) => ({ stringValue: value })),
    //       },
    //     },
    //     detail: { stringValue: detail },
    //     desiredExperience: { integerValue: desiredExperience.toString() },
    //     desiredQualifications: { stringValue: desiredQualifications },
    //     preferredLectureOrConsultingStyle: {
    //       arrayValue: {
    //         values: preferredLectureOrConsultingStyle.map((value) => ({ stringValue: value })),
    //       },
    //     },
    //     AdministratorApproval: { booleanValue: AdministratorApproval },
    //   }
    // }
    // const firestoreRes = await fetch(
    //   `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Users/${email}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + idToken,
    //     },
    //     body: JSON.stringify(firestoreClientData),
    //   }
    // );
    // const firestoreUserDataRes = await firestoreRes.json();
    // if (firestoreUserDataRes.error) {
    //   throw new Error(firestoreUserDataRes.error.message);
    // }
    // return new Response(JSON.stringify({ message: "회원가입성공" }), {
    //   status: 200,
    // });
  } catch (error) {
    console.log("---------------------------");
    console.log(error.message);
    console.log("---------------------------");
    return new Response(JSON.stringify({ errorMessage: error.message }), {
      status: 500,
    });
  }
}
