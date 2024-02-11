import { LectureEdit } from "@/components/Templates/Profile/Lecture-edit";
import type { Lecture } from "@/types/lecture";

interface LectureEditPageProps {
  lectureID: string;
  lectureData: Lecture;
}
export default function LectureEditPage({
  lectureID,
  lectureData,
}: LectureEditPageProps) {
  return <LectureEdit lectureData={lectureData} lectureID={lectureID} />;
}
