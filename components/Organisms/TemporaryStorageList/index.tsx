import type { AnnouncementDatasType } from "@/types/profile";
import type { ClientUser, EducatorUser } from "@/types/user";
import Link from "next/link";

interface TemporaryStorageListProps {
  userData: EducatorUser | ClientUser;
  TemporaryStorageDatas: AnnouncementDatasType[];
}
export const TemporaryStorageList = ({
  userData,
  TemporaryStorageDatas,
}: TemporaryStorageListProps) => {
  const { email } = userData;
  const userID = email.split("@")[0];

  return (
    <ul>
      {TemporaryStorageDatas.map((TemporaryStorageData) => {
        return (
          <li key={TemporaryStorageData.id}>
            <span>{TemporaryStorageData.createTime}</span>
            <Link
              href={`/${userID}/announcement-edit/${TemporaryStorageData.id}`}
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
