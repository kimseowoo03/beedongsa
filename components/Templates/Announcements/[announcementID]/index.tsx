import { useAtom } from "jotai";
import { inquiriesModalAtom } from "@/atoms/modal";

import { Announcement } from "@/types/announcement";
import { InquiriesModal } from "@/components/Organisms/InquiriesModal";

interface AnnouncementDetailProps {
  announcementID: string;
  announcementData: Announcement;
  isLoading: boolean;
}
export const AnnouncementDetail = ({
  announcementID,
  announcementData,
  isLoading,
}: AnnouncementDetailProps) => {
  const [isInquiriesModal, setIsInquiriesModal] = useAtom(inquiriesModalAtom);

  if (isLoading) {
    return <p>로딩중입니다</p>;
  }

  //TODO: 스켈레톤 컴포넌트로 랜더링 구성
  return (
    <>
      <div>
        {isLoading ? "데이터 로딩중..." : announcementData.title}
        <button type="button" onClick={() => setIsInquiriesModal(true)}>
          문의하기
        </button>
      </div>

      <InquiriesModal
        inquiryPostTitle={announcementData.title}
        inquiryPostId={announcementID}
        responderId={announcementData.registeredEmail.split("@")[0]}
      />
    </>
  );
};
