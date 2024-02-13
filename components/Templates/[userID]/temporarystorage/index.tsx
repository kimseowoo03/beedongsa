import { ContentActionBar } from "@/components/Molecules/ContentActionBar";
import { TemporaryStorageList } from "@/components/Organisms/TemporaryStorageList";
import { ProfileAnnouncementDatasType } from "@/types/profile";
import type { ClientUser, EducatorUser } from "@/types/user";

interface TemporaryStorageProps {
  userData: EducatorUser | ClientUser;
  TemporaryStorageDatas: ProfileAnnouncementDatasType[];
}
export const TemporaryStorage = ({
  userData,
  TemporaryStorageDatas,
}: TemporaryStorageProps) => {
  return (
    <>
      <ContentActionBar>
        <p>총 {TemporaryStorageDatas.length}개</p>
      </ContentActionBar>
      <TemporaryStorageList
        userData={userData}
        TemporaryStorageDatas={TemporaryStorageDatas}
      />
    </>
  );
};
