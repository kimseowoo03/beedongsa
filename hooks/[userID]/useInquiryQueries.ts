import { userAtom } from "@/atoms/auth";
import { Inquiries } from "@/types/inquiries";
import { useAtom } from "jotai";
import { useTransformedQueryData } from "../useTransformedQueryData";

export function useOutgoingInquiriesQuery() {
  const [{ userID, type }] = useAtom(userAtom);

  const outgoingInquiriesQuery = useTransformedQueryData<Inquiries>(
    "Inquiries",
    "questionerId",
    userID
  );

  return outgoingInquiriesQuery;
}

export function useReceivingInquiriesQuery() {
  const [{ userID, type }] = useAtom(userAtom);

  const receivingInquiriesQuery = useTransformedQueryData<Inquiries>(
    "Inquiries",
    "responderId",
    userID
  );

  return receivingInquiriesQuery;
}
