"use client"

import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css"
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>()
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  const router = useRouter()
  const handleClose = () => router.back()

  if (isLoading) return <p>Loading, please wait...</p>

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.tag}>{note.tag}</p>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>Created at: {note.createdAt}</p>
        </div>
      </div>
      <button className={css.backBtn} onClick={handleClose}>Back</button>
    </Modal>
  )
}

export default NotePreviewClient;