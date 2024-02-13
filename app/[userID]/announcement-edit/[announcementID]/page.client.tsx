import { AnnouncementEdit } from "@/components/Templates/[userID]/Announcement-edit";
import type { Announcement } from "@/types/announcement";

interface AnnouncementEditPageProps {
  announcementID: string;
  announcementData: Announcement;
}
export default function AnnouncementEditPage({
  announcementID,
  announcementData,
}: AnnouncementEditPageProps) {
  return (
    <AnnouncementEdit
      announcementID={announcementID}
      announcementData={announcementData}
    />
  );
}
