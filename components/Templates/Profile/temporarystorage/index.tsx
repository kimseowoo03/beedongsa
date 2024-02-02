import { ContentActionBar } from "@/components/Molecules/ContentActionBar";
import { TemporaryStorageList } from "@/components/Organisms/TemporaryStorageList";
import { ProfileAnnouncementDatasType } from "@/types/profile";
import type { UserType } from "@/types/user";

interface TemporaryStorageProps {
  userType: UserType;
  TemporaryStorageDatas: ProfileAnnouncementDatasType[];
}
export const TemporaryStorage = ({
  userType,
  TemporaryStorageDatas,
}: TemporaryStorageProps) => {
  return (
    <>
      <ContentActionBar>
        <p>총 {TemporaryStorageDatas.length}개</p>
      </ContentActionBar>
      <TemporaryStorageList
        userType={userType}
        TemporaryStorageDatas={TemporaryStorageDatas}
      />
    </>
  );
};
