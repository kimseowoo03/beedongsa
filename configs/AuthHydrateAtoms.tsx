"use client";

import { useHydrateAtoms } from "jotai/utils";

import type { TokenType } from "@/types/auth";
import { userAtom } from "@/atoms/auth";
import type { UserType } from "@/types/user";

interface AuthHydrateAtomsProps {
  children: React.ReactNode;
  email: string;
  name: string;
  idToken: TokenType;
  type?: UserType;
}

export default function AuthHydrateAtoms({
  children,
  email,
  name,
  idToken,
  type,
}: AuthHydrateAtomsProps) {
  const userID = email ? email.split("@")[0] : null;

  useHydrateAtoms([[userAtom, { idToken, email, userID, name, type }]]);

  return <>{children}</>;
}
