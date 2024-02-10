import type { Announcement } from "./announcement";
import type { Lecture } from "./lecture";

export interface ProfileAnnouncementDatasType {
  id: string;
  data: Announcement;
  createTime: string;
}

export interface ProfileLectureDatasType {
  id: string;
  data: Lecture;
  createTime: string;
}
