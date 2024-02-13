import { TemporaryStorage } from "@/components/Templates/[userID]/temporarystorage";
import type { ProfileAnnouncementDatasType } from "@/types/profile";
import type { ClientUser, EducatorUser } from "@/types/user";

interface TemporaryStoragePageProps {
  userData: EducatorUser | ClientUser;
  TemporaryStorageDatas: ProfileAnnouncementDatasType[];
}

export default function TemporaryStoragePage({
  userData,
  TemporaryStorageDatas,
}: TemporaryStoragePageProps) {
  return (
    <TemporaryStorage
      userData={userData}
      TemporaryStorageDatas={TemporaryStorageDatas}
    />
  );
}
