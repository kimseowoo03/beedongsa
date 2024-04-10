import { useAtom } from "jotai";
import { inquiriesModalAtom } from "@/atoms/modal";

import { Announcement } from "@/types/announcement";
import { InquiriesModal } from "@/components/Organisms/InquiriesModal";
import { ApplyModal } from "@/components/Organisms/ApplyModal";
import { firestoreQueryDocumentResData } from "@/types/firebaseType";
import { Lecture } from "@/types/lecture";
import { userAtom } from "@/atoms/auth";
import { applyValuesAtom, applyModalAtom } from "@/atoms/apply";

interface AnnouncementDetailProps {
  announcementID: string;
  announcementData: Announcement;
  isLoading: boolean;
  ProfileDatas: firestoreQueryDocumentResData<Lecture>[];
}
export const AnnouncementDetail = ({
  announcementID,
  announcementData,
  isLoading,
  ProfileDatas,
}: AnnouncementDetailProps) => {
  const [{ idToken, type }] = useAtom(userAtom);
  const [_isInquiriesModal, setIsInquiriesModal] = useAtom(inquiriesModalAtom);
  const [_isApplyModalOpen, setIsApplyModalOpen] = useAtom(applyModalAtom);
  const [_applyValues, setApplyValues] = useAtom(applyValuesAtom);

  if (isLoading) {
    return <p>로딩중입니다</p>;
  }

  const applyModalOpenHandler = () => {
    if (!idToken) {
      alert("로그인한 유저만 사용이 가능합니다.");
      return;
    }
    setApplyValues((prevValues) => ({
      ...prevValues,
      recruitmentDeadline: announcementData.recruitmentDeadline,
      clientID: announcementData.registeredEmail.split("@")[0],
      clientName: announcementData.clientName,
      announcementID: announcementID,
      announcementTitle: announcementData.title,
      announcementSchedule: announcementData.schedule,
    }));
    setIsApplyModalOpen(() => true);
  };

  return (
    <>
      <div>
        {isLoading ? "데이터 로딩중..." : announcementData.title}
        <button type="button" onClick={() => setIsInquiriesModal(true)}>
          문의하기
        </button>
        {type === "educator" && (
          <button type="button" onClick={applyModalOpenHandler}>
            지원하기
          </button>
        )}
      </div>

      <InquiriesModal
        inquiryPostTitle={announcementData.title}
        inquiryPostId={announcementID}
        responderId={announcementData.registeredEmail.split("@")[0]}
      />

      <ApplyModal ProfileDatas={ProfileDatas} />
    </>
  );
};
