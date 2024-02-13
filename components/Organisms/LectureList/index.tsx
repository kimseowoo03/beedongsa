/**react, next */
import { useState } from "react";
import Link from "next/link";

/**상태관리 */
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

/**components */
import ToggleIcon from "@/components/Atoms/ToggleIcon";

/**styles */
import { ItemColum, List, ListHeader, Item } from "@/styles/List";

/**types */
import type { ProfileLectureDatasType } from "@/types/profile";

interface LectureListProps {
  ProfileData: ProfileLectureDatasType;
}
const LectureList = ({ ProfileData }: LectureListProps) => {
  const [{ email }] = useAtom(userAtom);
  const userID = email.split("@")[0];

  const { id, data } = ProfileData;

  const [showList, setShowList] = useState(false);

  const INTERVIEWDATA = {
    interview1: data.interview1,
    interview2: data.interview2,
    interview3: data.interview3,
  };

  const totalMinutes = data.curriculum.reduce(
    (total, item) => total + parseInt(item, 10),
    0
  );
  return (
    <div>
      <ListHeader onClick={() => setShowList((prev) => !prev)}>
        <h2> {data.title}</h2>
        <div>
          <Link href={`/${userID}/lecture-edit/${id}`}>수정</Link>
          <ToggleIcon isClicked={showList} />
        </div>
      </ListHeader>
      {showList && (
        <>
          <List>
            <Item>
              <div>상세 소개</div>
              <div>{data.description}</div>
            </Item>
            <Item>
              <div>카테고리</div>
              <div>
                {data.category.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </Item>
            <Item>
              <div>가능지역</div>
              <div>
                {data.availableRegions.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </Item>
            <Item>
              <div>대상</div>
              <div>
                {data.target.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </Item>
            <Item>
              <div>데모 강의 여부</div>
              <div>{data.isDemoLecture}</div>
            </Item>
            <Item>
              <div>총 소요시간</div>
              <div>{data.totalTime}분</div>
            </Item>
            <Item>
              <div>비용 (1회)</div>
              <div>
                {data.expense.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </Item>
            <Item>
              <div>다회차 책정기준</div>
              <div>{data.multiSessionPricing}</div>
            </Item>
            <Item>
              <div>추가비용 책정기준</div>
              <div>{data.additionalCost}</div>
            </Item>
            <Item>
              <div>포함내역</div>
              <div>{data.includedDetails}</div>
            </Item>
            <Item>
              <div>장거리 출장 가능여부</div>
              <div>{data.isLongDistance === "Y" ? "가능" : "불가능"}</div>
            </Item>
            <Item>
              <div>링크 첨부</div>
              <div>
                {data.linkAttached.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            </Item>
            <Item>
              <div>커리큘럼</div>
              <div>
                <span>[총 {totalMinutes}분]</span>
                {data.curriculum.map((item) => {
                  const [minutes, detail] = item.split(" ", 2);

                  return <p key={item}>{`${minutes}분 ${detail}`}</p>;
                })}
              </div>
            </Item>

            {data.questions.map((question) => {
              const [key, ...questionText] = question.split(" ");
              const questionTextJoined = questionText.join(" ");

              return (
                <ItemColum key={key}>
                  <div>Q. {questionTextJoined}</div>
                  <div>A. {INTERVIEWDATA[key]}</div>
                </ItemColum>
              );
            })}
          </List>
        </>
      )}
    </div>
  );
};

export default LectureList;
