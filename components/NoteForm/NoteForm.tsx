"use client"
import css from "./NoteForm.module.css"
import { useId } from "react";
import type { NewNote } from "../../types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";


export default function NoteForm() {
  const fieldId = useId();
  const router = useRouter()
  const { draft, setDraft, clearDraft} = useNoteDraftStore();
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft()
      router.push("/notes/filter/All")
    }
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value
    })
  }
  const handleClose = () => {
    router.back()
  }
  

  const handleSubmit = (formData: FormData) => {  
    const data = Object.fromEntries(formData) as unknown as NewNote;
    if (data.title.trim().length === 0) {
      return alert("Please enter note's title");
    } else if (data.content.trim().length === 0) {
      return alert("Please enter note's content")
    }
    mutate(data)
  }

  return (
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <input
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
            defaultValue={draft.title}
            onChange={handleChange}
          />
        </div>
  
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <textarea
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft.content}
            onChange={handleChange}
          />
        </div>
  
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <select
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
            defaultValue={draft.tag}
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
            <option value="Ideas">Ideas</option>
            <option value="Travel">Travel</option>
            <option value="Finance">Finance</option>
            <option value="Important">Important</option>
          </select>
        </div>
  
        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={handleClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </form>
  )
}
