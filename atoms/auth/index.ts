import { UserType } from "@/types/user";
import { atom } from "jotai";

interface UserAtom {
  idToken: string | null;
  email: string | null;
  userID: string | null;
  name: string | null;
  type: UserType | null;
}
export const userAtom = atom<UserAtom>({
  idToken: undefined,
  email: undefined,
  userID: undefined,
  name: undefined,
  type: undefined,
});
