"use client";

interface LectureDetailPageProps {
  lectureID: string;
}
export default function LectureDetailPage({
  lectureID,
}: LectureDetailPageProps) {
  return (
    <div>디테일 페이지 입니다 클릭하신 강의 아이디는 {lectureID} 입니다.</div>
  );
}
