"use client";

import { idTokenAtom } from "@/atoms/auth/idTokenAtom";
import { useHydrateAtoms } from "jotai/utils";

import type { TokenType } from "@/types/auth";

interface AuthHydrateAtomsProps {
  children: React.ReactNode;
  newIDToken: TokenType;
}

export default function AuthHydrateAtoms({
  children,
  newIDToken,
}: AuthHydrateAtomsProps) {
  useHydrateAtoms([[idTokenAtom, newIDToken]]);

  return <>{children}</>;
}
