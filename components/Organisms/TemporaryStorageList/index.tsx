import type { ProfileAnnouncementDatasType } from "@/types/profile";
import type { UserType } from "@/types/user";
import Link from "next/link";

interface TemporaryStorageListProps {
  userType: UserType;
  TemporaryStorageDatas: ProfileAnnouncementDatasType[];
}
export const TemporaryStorageList = ({
  userType,
  TemporaryStorageDatas,
}: TemporaryStorageListProps) => {
  return (
    <ul>
      {TemporaryStorageDatas.map((TemporaryStorageData) => {
        return (
          <li key={TemporaryStorageData.id}>
            <span>{TemporaryStorageData.createTime}</span>
            <Link
              href={`/profile/client/announcement-edit/${TemporaryStorageData.id}`}
            >
              {TemporaryStorageData.data.title}
            </Link>
          </li>
        );
      })}
      <li></li>
    </ul>
  );
};
