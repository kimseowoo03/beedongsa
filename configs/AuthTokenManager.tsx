"use client";

/**상태관리 */
import { idTokenAtom } from "@/atoms/auth/idTokenAtom";
import { useHydrateAtoms } from "jotai/utils";

export default function AuthTokenManager({
  newIDToken,
}: {
  newIDToken: string | null;
}) {
  useHydrateAtoms([[idTokenAtom, newIDToken]]);

  return null;
}
