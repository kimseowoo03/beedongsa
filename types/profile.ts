import type { Announcement } from "./announcement";
import type { Lecture } from "./lecture";

export interface AnnouncementDatasType {
  id: string;
  data: Announcement;
  createTime: string;
}

export interface LectureDatasType {
  id: string;
  data: Lecture;
  createTime: string;
}
