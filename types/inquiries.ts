import { QueryObserverResult } from "@tanstack/react-query";

export interface Inquiries {
  dateOfInquiry: string;
  questionerId: string;
  responderId: string;
  inquiryPostId: string;
  inquiryPostTitle: string;
  questionContent: string;
  answerContent: string;
}

export interface InquiriesQuery {
  data: {
    createTime: string;
    data: Inquiries[];
    id: string;
  }[];
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<Inquiries[], Error>>;
}
