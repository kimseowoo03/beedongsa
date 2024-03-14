import Link from "next/link";

import {
  DateItem,
  Item,
  List,
  ListHeader,
  ListTitle,
  ListWrap,
} from "@/styles/List";

import UploadFile from "@/components/Molecules/UploadFile";

import type { EducatorUser } from "@/types/user";

interface ProfileDetailInfoProps {
  userData: EducatorUser;
}
const ProfileDetailInfo = ({ userData }: ProfileDetailInfoProps) => {
  const {
    experience,
    experienceRecord,
    certificate,
    etcRecord,
    education,
    portfolios,
  } = userData;
  return (
    <>
      <ListWrap>
        <List>
          <ListTitle>총 경력 - {experience}년</ListTitle>
          {experienceRecord.map((item) => {
            const [dateRange, title] = item.split(/\s+(.+)/);
            return (
              <DateItem key={item}>
                <div>{dateRange}</div>
                <div>{title}</div>
              </DateItem>
            );
          })}
        </List>
        <List>
          <ListTitle>자격증</ListTitle>
          {certificate.map((item) => {
            const [dateRange, title] = item.split(/\s+(.+)/);
            return (
              <DateItem key={item}>
                <div>{dateRange}</div>
                <div>{title}</div>
              </DateItem>
            );
          })}
        </List>
        <List>
          <ListTitle>학력</ListTitle>
          {education &&
            education.map((item) => {
              const [dateRange, title] = item.split(/\s+(.+)/);
              return (
                <DateItem key={item}>
                  <div>{dateRange}</div>
                  <div>{title}</div>
                </DateItem>
              );
            })}
        </List>
        <List>
          <ListTitle>기타 이력</ListTitle>
          {etcRecord.map((item) => {
            const [dateRange, title] = item.split(/\s+(.+)/);
            return (
              <DateItem key={item}>
                <div>{dateRange}</div>
                <div>{title}</div>
              </DateItem>
            );
          })}
        </List>
      </ListWrap>

      <UploadFile userFiles={portfolios} />
    </>
  );
};

export default ProfileDetailInfo;
