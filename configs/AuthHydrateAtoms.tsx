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
  useHydrateAtoms([[userAtom, { idToken, email }]]);

  return <>{children}</>;
}
