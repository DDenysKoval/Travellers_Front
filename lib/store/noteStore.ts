import { NewNote } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteDraftStore {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
};

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state)=>({draft:state.draft}),
    }
  )
);