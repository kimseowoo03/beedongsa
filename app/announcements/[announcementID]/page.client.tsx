"use client";

interface AnnouncementDetailPageProps {
  announcementID: string;
}
export default function AnnouncementDetailPage({
  announcementID,
}: AnnouncementDetailPageProps) {
  return (
    <div>
      디테일 페이지 입니다 클릭하신 공고 아이디는 {announcementID} 입니다.
    </div>
  );
}
