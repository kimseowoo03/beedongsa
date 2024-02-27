"use client";
import NoticeBar from "@/components/Atoms/NoticeBar";
import { AnnouncementDatasType, LectureDatasType } from "@/types/profile";
import Link from "next/link";

interface HomeProps {
  data: {
    announcements: AnnouncementDatasType[];
    approvedLectures: LectureDatasType[];
  };
  isLoading: boolean;
}
export const Home = ({ data, isLoading }: HomeProps) => {
  console.log(data, "가져온 데이터입니다");

  return (
    <div>
      <NoticeBar>
        [~ 2024.06 베타서비스] 베타서비스 기간내 가입 시 업무지원 유료서비스
        2024년까지 무료 지원 혜택!{" "}
      </NoticeBar>
      {isLoading ? (
        <div>데이터 가져오는중</div>
      ) : (
        <div>
          <h2>지금 막 뜬 공고들</h2>
          <div>
            {data.announcements ? (
              data.announcements.map((data) => {
                return (
                  <div key={data.id}>
                    <Link href={`/announcements/${data.id}`}>{data.id}</Link>
                  </div>
                );
              })
            ) : (
              <div>데이터 없음</div>
            )}
          </div>

          <h2>승인된 강의들</h2>
          <div>
            {data.approvedLectures ? (
              data.approvedLectures.map((data) => {
                return (
                  <div key={data.id}>
                    <Link href={`/lectures/${data.id}`}>{data.id}</Link>
                  </div>
                );
              })
            ) : (
              <div>데이터 없음</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
