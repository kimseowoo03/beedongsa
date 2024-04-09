import { useAtom } from "jotai";
import { useTransformedQueryData } from "../useTransformedQueryData";
import { userAtom } from "@/atoms/auth";
import { Apply } from "@/types/apply";

export function useApplyQuery() {
  const [{ userID, type }] = useAtom(userAtom);

  const applyQuery = useTransformedQueryData<Apply>(
    "Apply",
    type === "client" ? "clientID" : "educatorID",
    userID
  );

  return applyQuery;
}
