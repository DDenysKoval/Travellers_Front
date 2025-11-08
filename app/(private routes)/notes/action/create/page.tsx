import css from "./CreateNote.module.css"
import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create New Note",
  description: "Page for creating new note",
  openGraph: {
    title: "Create New Note",
    description: "Page for creating new note",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1374,
        height: 916,
        alt: "NoteHub logo"
      },
    ],
  }
}

const CreateNote = async () => {
  
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm/>
      </div>
    </main>
  );
}

export default CreateNote;