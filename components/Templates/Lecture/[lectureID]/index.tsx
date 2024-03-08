import { useAtom } from "jotai";
import { inquiriesModalAtom } from "@/atoms/modal";

import { InquiriesModal } from "@/components/Organisms/InquiriesModal";
import { Lecture } from "@/types/lecture";

interface LectureDetailProps {
  lectureID: string;
  lectureData: Lecture;
  isLoading: boolean;
}
export const LectureDetail = ({
  lectureID,
  lectureData,
  isLoading,
}: LectureDetailProps) => {
  const [isInquiriesModal, setIsInquiriesModal] = useAtom(inquiriesModalAtom);

  if (isLoading) {
    return <p>로딩중입니다</p>;
  }

  //TODO: 스켈레톤 컴포넌트로 랜더링 구성
  return (
    <>
      <div>
        {isLoading ? "데이터 로딩중..." : lectureData.title}
        <button type="button" onClick={() => setIsInquiriesModal(true)}>
          문의하기
        </button>
      </div>

      <InquiriesModal
        inquiryPostTitle={lectureData.title}
        inquiryPostId={lectureID}
        responderId={lectureData.registeredEmail.split("@")[0]}
      />
    </>
  );
};
