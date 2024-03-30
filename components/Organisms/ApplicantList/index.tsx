import { useState } from "react";

import type { Apply, ApplyQuery } from "@/types/apply";
import type { AnnouncementDatasType } from "@/types/profile";
import type { firestoreQueryDocumentResData } from "@/types/firebaseType";
import { useAtom, useSetAtom } from "jotai";
import {
  applyInitialValuesAtom,
  applyModalAtom,
  applyStatusAtom,
} from "@/atoms/apply";

interface ApplicantListProps {
  applicantQuery: ApplyQuery;
  ProfileDatas: AnnouncementDatasType[];
}
export const ApplicantList = ({
  applicantQuery,
  ProfileDatas,
}: ApplicantListProps) => {
  const { data: initialFirestoreQueryDocumentResData } = applicantQuery;
  const [selectedValue, setSelectedValue] = useState("전체");
  const [applicantDatas, setApplicantDatas] = useState<
    firestoreQueryDocumentResData<Apply>[]
  >(initialFirestoreQueryDocumentResData);

  const [applyInitialValues, setApplyInitialValues] = useAtom(
    applyInitialValuesAtom
  );

  const setApplyStatus = useSetAtom(applyStatusAtom);
  const [isApplyModalOpen, setIsApplyModalOpen] = useAtom(applyModalAtom);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAnnouncementTitle = event.target.value;
    setSelectedValue(() => selectedAnnouncementTitle);

    let updatedApplicantDatas = [];

    if (initialFirestoreQueryDocumentResData) {
      updatedApplicantDatas =
        selectedAnnouncementTitle === "전체"
          ? initialFirestoreQueryDocumentResData
          : initialFirestoreQueryDocumentResData.filter(
              ({ data }) => data.announcementTitle === selectedAnnouncementTitle
            );
    }

    setApplicantDatas(() => updatedApplicantDatas);
  };

  const handleApplyCheck = (data: Apply) => {
    console.log(isApplyModalOpen, "<<<<isApplyModalOpen");
    setApplyInitialValues(() => ({ ...data }));

    setApplyStatus({
      sentStatus: data.sentStatus,
      responseStatus: data.responseStatus,
      matchConfirmationStatus: data.matchConfirmationStatus,
    });

    setIsApplyModalOpen(true);
  };

  return (
    <div>
      <select onChange={handleSelectChange}>
        <option defaultValue="전체">전체</option>
        {ProfileDatas.map(({ data, id }) => {
          return (
            <option key={id} value={data.title}>
              {data.title}
            </option>
          );
        })}
      </select>

      <ul>
        {applicantDatas ? (
          applicantDatas.map(({ data, id }) => {
            return (
              <li key={id}>
                <p>{data.dateOfInquiry}</p>
                <p>{data.educatorName}</p>
                <p>
                  {data.applyType === "registeredProfile"
                    ? "프로필 지원"
                    : "파일 지원"}
                </p>
                <button type="button" onClick={() => handleApplyCheck(data)}>
                  지원확인
                </button>
              </li>
            );
          })
        ) : (
          <p>지원자가 없습니다</p>
        )}
      </ul>
    </div>
  );
};
