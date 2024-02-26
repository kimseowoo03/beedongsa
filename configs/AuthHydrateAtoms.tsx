"use client";

import { useHydrateAtoms } from "jotai/utils";

import type { TokenType } from "@/types/auth";
import { userAtom } from "@/atoms/auth";

interface AuthHydrateAtomsProps {
  children: React.ReactNode;
  email: string;
  idToken: TokenType;
}

export default function AuthHydrateAtoms({
  children,
  email,
  idToken,
}: AuthHydrateAtomsProps) {
  const userID = email ? email.split("@")[0] : null;

  useHydrateAtoms([[userAtom, { idToken, email, userID }]]);

  return <>{children}</>;
}
