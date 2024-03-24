import { atom } from "jotai";

export const inquiriesModalAtom = atom(false);

export const applyModalAtom = atom(false);

export const applyStatusModalAtom = atom(false);

export const applyStatusAtom = atom({
  sentStatus: false,
  responseStatus: false,
  matchConfirmationStatus: false,
});
