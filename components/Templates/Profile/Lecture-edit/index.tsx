import { LectureForm } from "@/components/Organisms/LectureForm";
import type { Lecture } from "@/types/lecture";

interface LectureEditProps {
  lectureID: string;
  lectureData: Lecture;
}
export const LectureEdit = ({ lectureID, lectureData }: LectureEditProps) => {
  return (
    <LectureForm
      formType="edit"
      lectureData={lectureData}
      lectureID={lectureID}
    />
  );
};
