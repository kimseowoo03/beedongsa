import { ContentActionBar } from "@/components/Molecules/ContentActionBar";
import { TemporaryStorageList } from "@/components/Organisms/TemporaryStorageList";
import { AnnouncementDatasType } from "@/types/profile";
import type { ClientUser, EducatorUser } from "@/types/user";

interface TemporaryStorageProps {
  userData: EducatorUser | ClientUser;
  TemporaryStorageDatas: AnnouncementDatasType[];
}
export const TemporaryStorage = ({
  userData,
  TemporaryStorageDatas,
}: TemporaryStorageProps) => {
  return (
    <>
      <ContentActionBar>
        <p>총 {TemporaryStorageDatas ? TemporaryStorageDatas.length : 0}개</p>
      </ContentActionBar>
      {TemporaryStorageDatas && (
        <TemporaryStorageList
          userData={userData}
          TemporaryStorageDatas={TemporaryStorageDatas}
        />
      )}
    </>
  );
};
