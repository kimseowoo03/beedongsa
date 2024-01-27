import { AnnouncementForm } from "@/components/Organisms/AnnouncementForm";
import type { Announcement } from "@/types/announcement";

interface AnnouncementEditProps {
  announcementID: string;
  announcementData: Announcement;
}
export const AnnouncementEdit = ({
  announcementID,
  announcementData,
}: AnnouncementEditProps) => {
  return (
    <AnnouncementForm
      announcementData={announcementData}
      announcementID={announcementID}
    />
  );
};
