import { TemporaryStorage } from "@/components/Templates/Profile/temporarystorage";
import type { ProfileAnnouncementDatasType } from "@/types/profile";
import type { UserType } from "@/types/user";

interface TemporaryStoragePageProps {
  userType: UserType;
  TemporaryStorageDatas: ProfileAnnouncementDatasType[];
}

export default function TemporaryStoragePage({
  userType,
  TemporaryStorageDatas,
}: TemporaryStoragePageProps) {
  return (
    <TemporaryStorage
      userType={userType}
      TemporaryStorageDatas={TemporaryStorageDatas}
    />
  );
}
