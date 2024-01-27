/**
 * 1. Announcement 정보 저장
 * 2. Announcement 고유 ID 해당 이메일 유저 정보에
 */
import { Announcement } from "@/types/announcement";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization").split(" ")[1];
  if (!token) {
    throw new Error("유효하지 않은 사용자입니다.");
  }

  const data: Announcement = await request.json();
  console.log(data, "<<POSTSTSSTST");
  try {
    const {
      registeredEmail,
      title,
      category,
      metropolitanCity,
      dstrict,
      detailedAddress,
      schedule,
      recruitmentDeadline,
      target,
      personnel,
      totalCost,
      supportIncludedInTheCost,
      detail,
      desiredExperience,
      desiredQualifications,
      preferredLectureOrConsultingStyle,
      administratorApproval,
      closeAnnouncement,
    } = data;

    const firestoreClientData = {
      fields: {
        registeredEmail: { stringValue: registeredEmail },
        title: { stringValue: title },
        category: {
          arrayValue: {
            values: category.map((value) => ({ stringValue: value })),
          },
        },
        metropolitanCity: { stringValue: metropolitanCity },
        dstrict: { stringValue: dstrict },
        detailedAddress: { stringValue: detailedAddress },
        schedule: {
          arrayValue: {
            values: schedule.map((value) => ({ stringValue: value })),
          },
        },
        recruitmentDeadline: { stringValue: recruitmentDeadline },
        target: {
          arrayValue: {
            values: target.map((value) => ({ stringValue: value })),
          },
        },
        personnel: { integerValue: personnel },
        totalCost: { integerValue: totalCost },
        supportIncludedInTheCost: {
          arrayValue: {
            values: supportIncludedInTheCost.map((value) => ({
              stringValue: value,
            })),
          },
        },
        detail: { stringValue: detail },
        desiredExperience: { integerValue: desiredExperience },
        desiredQualifications: { stringValue: desiredQualifications },
        preferredLectureOrConsultingStyle: {
          arrayValue: {
            values: preferredLectureOrConsultingStyle.map((value) => ({
              stringValue: value,
            })),
          },
        },
        administratorApproval: { booleanValue: administratorApproval },
        closeAnnouncement: { booleanValue: closeAnnouncement },
      },
    };

    const firestoreAnnouncementsRes = await fetch(
      `https://firestore.googleapis.com/v1beta1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Announcements/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(firestoreClientData),
      }
    );

    const firestoreAnnouncementsData = await firestoreAnnouncementsRes.json();

    if (firestoreAnnouncementsData.error) {
      throw new Error(firestoreAnnouncementsData.error.message);
    }

    return new Response(
      JSON.stringify({
        data: firestoreAnnouncementsData,
        message: "공고 등록 완료",
      }),
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
