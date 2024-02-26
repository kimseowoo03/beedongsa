import { TemporaryStorage } from "@/components/Templates/[userID]/temporarystorage";
import type { AnnouncementDatasType } from "@/types/profile";
import type { ClientUser, EducatorUser } from "@/types/user";

interface TemporaryStoragePageProps {
  userData: EducatorUser | ClientUser;
  TemporaryStorageDatas: AnnouncementDatasType[];
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
