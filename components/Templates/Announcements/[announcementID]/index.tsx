import { useAtom } from "jotai";
import { applyModalAtom, inquiriesModalAtom } from "@/atoms/modal";

import { Announcement } from "@/types/announcement";
import { InquiriesModal } from "@/components/Organisms/InquiriesModal";
import { ApplyModal } from "@/components/Organisms/ApplyModal";
import { firestoreQueryDocumentResData } from "@/types/firebaseType";
import { Lecture } from "@/types/lecture";
import { userAtom } from "@/atoms/auth";

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
  const [{ idToken, name, userID, type }] = useAtom(userAtom);
  const [isInquiriesModal, setIsInquiriesModal] = useAtom(inquiriesModalAtom);
  const [isApplyModalOpen, setIsApplyModalOpen] = useAtom(applyModalAtom);

  if (isLoading) {
    return <p>로딩중입니다</p>;
  }

  const applyModalOpenHandler = () => {
    if (!idToken) {
      alert("로그인한 유저만 사용이 가능합니다.");
      return;
    }
    setIsApplyModalOpen(true);
  };

  //TODO: 스켈레톤 컴포넌트로 랜더링 구성

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
      {/**강사만 접근할 수 있는 모달 */}
      <ApplyModal
        recruitmentDeadline={announcementData.recruitmentDeadline}
        clientID={announcementData.registeredEmail.split("@")[0]}
        clientName={announcementData.clientName}
        announcementID={announcementID}
        announcementTitle={announcementData.title}
        announcementSchedule={announcementData.schedule}
        ProfileDatas={ProfileDatas}
      />
    </>
  );
};
