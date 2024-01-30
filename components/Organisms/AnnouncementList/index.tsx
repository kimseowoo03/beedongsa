/**react, next */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

/**상태관리 */
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

/**components */
import ToggleIcon from "@/components/Atoms/ToggleIcon";

/**styles */
import { ArrayItem, List, ListHeader, TextItem } from "@/styles/List";

/**types */
import type { TokenType } from "@/types/auth";
import type { ProfileDatasType } from "@/types/profile";

const announcementClose = async ({
  id,
  token,
}: {
  id: string;
  token: NonNullable<TokenType>;
}): Promise<any> => {
  const response = await fetch("/api/announcement/close", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }
  return response.json();
};

interface AnnouncementListProps {
  ProfileData: ProfileDatasType;
}
const AnnouncementList = ({ ProfileData }: AnnouncementListProps) => {
  const [{ idToken }] = useAtom(userAtom);
  const { id, data } = ProfileData;

  const [showList, setShowList] = useState(false);

  const mutation = useMutation({
    mutationFn: announcementClose,
  });

  const announcementCloseHandler = () => {
    mutation.mutate(
      {
        id,
        token: idToken,
      },
      {
        onSuccess: (response) => {
          alert(response.message);
          //공고 마감 값 변경 해주기
          data.closeAnnouncement = true;
        },
      }
    );
  };

  return (
    <div>
      <ListHeader onClick={() => setShowList((prev) => !prev)}>
        <h2> {data.title}</h2>
        <div>
          {!data.closeAnnouncement && (
            <Link href={`/profile/client/announcement-edit/${id}`}>수정</Link>
          )}
          <button
            type="button"
            onClick={announcementCloseHandler}
            disabled={data.closeAnnouncement}
          >
            공고 마감
          </button>
          <ToggleIcon isClicked={showList} />
        </div>
      </ListHeader>
      {showList && (
        <>
          <List>
            <ArrayItem>
              <div>카테고리</div>
              <div>
                {data.category.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </ArrayItem>
            <TextItem>
              <div>지역</div>
              <div>
                {data.metropolitanCity} {data.dstrict} {data.detailedAddress}
              </div>
            </TextItem>
            <ArrayItem>
              <div>일정</div>
              <div>
                {data.schedule.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </ArrayItem>
            <TextItem>
              <div>모집기한</div>
              <div>{data.recruitmentDeadline} 까지</div>
            </TextItem>
            <ArrayItem>
              <div>대상</div>
              <div>
                {data.target.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </ArrayItem>
            <TextItem>
              <div>인원</div>
              <div>최대 {data.personnel} 명</div>
            </TextItem>
            <TextItem>
              <div>총 비용</div>
              <div>{data.totalCost}원</div>
            </TextItem>
            <ArrayItem>
              <div>지원목록</div>
              <div>
                {data.supportIncludedInTheCost.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </ArrayItem>
            <TextItem>
              <div>상세내용</div>
              <div>{data.detail}</div>
            </TextItem>
          </List>
          <List>
            <h3>우대사항</h3>
            <TextItem>
              <div>경력</div>
              <div>{data.desiredExperience} 년차</div>
            </TextItem>
            <TextItem>
              <div>자격사항</div>
              <div>{data.desiredQualifications}</div>
            </TextItem>
            <ArrayItem>
              <div>원하는 스타일</div>
              <div>
                {data.preferredLectureOrConsultingStyle.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </ArrayItem>
          </List>
        </>
      )}
    </div>
  );
};

export default AnnouncementList;
