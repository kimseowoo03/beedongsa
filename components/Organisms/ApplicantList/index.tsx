import { useMemo, useState } from "react";

import { useAtom } from "jotai";
import {
  applyInitialValues,
  applyValuesAtom,
  applyModalAtom,
} from "@/atoms/apply";

import { useApplyQuery } from "@/hooks/[userID]/useApplyQuery";

import type { Apply } from "@/types/apply";
import type { AnnouncementDatasType } from "@/types/profile";

interface ApplicantListProps {
  ProfileDatas: AnnouncementDatasType[];
}

export const ApplicantList = ({ ProfileDatas }: ApplicantListProps) => {
  const { data, isLoading } = useApplyQuery();
  const [selectedValue, setSelectedValue] = useState("전체");

  const [applyValues, setApplyValues] = useAtom(applyValuesAtom);
  const [, setIsApplyModalOpen] = useAtom(applyModalAtom);

  // 사용자가 선택한 공고에 따라 필터링된 지원자 데이터
  const filteredApplicantData = useMemo(() => {
    return selectedValue === "전체"
      ? data
      : data?.filter(({ data }) => data.announcementTitle === selectedValue);
  }, [data, selectedValue]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAnnouncementTitle = event.target.value;
    setSelectedValue(selectedAnnouncementTitle);
  };

  const handleApplyCheck = (data: Apply, applyID: string) => {
    if (applyValues === applyInitialValues) {
      setApplyValues(() => ({ ...data, applyID }));
    }

    setIsApplyModalOpen(true);
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleSelectChange}>
        <option value="전체">전체</option>
        {ProfileDatas.map(({ data, id }) => (
          <option key={id} value={data.title}>
            {data.title}
          </option>
        ))}
      </select>

      <ul>
        {!isLoading && filteredApplicantData ? (
          filteredApplicantData.map(({ data, id }) => (
            <li key={id}>
              <p>{data.dateOfInquiry}</p>
              <p>{data.educatorName}</p>
              <p>
                {data.applyType === "registeredProfile"
                  ? "프로필 지원"
                  : "파일 지원"}
              </p>
              <button onClick={() => handleApplyCheck(data, id)}>
                지원확인
              </button>
            </li>
          ))
        ) : (
          <p>지원자가 없습니다.</p>
        )}
      </ul>
    </div>
  );
};
