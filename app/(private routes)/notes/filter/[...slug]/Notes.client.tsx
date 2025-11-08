"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css"
import Link from "next/link";
import { fetchNotes, NotesHttpResponse } from "@/lib/api/clientApi";

interface NotesClientProps {
  initialData: NotesHttpResponse,
  tag: string | undefined
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes(search, page, tag),
    placeholderData: keepPreviousData,
    initialData,
  })

  const totalPages = data?.totalPages ?? 1

  const handleChange = (value:string) => {
    debouncedSetSearch(value)
  };

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value)
    setPage(1)
  },
    1000
  );

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={ handleChange } />
        {isSuccess && totalPages > 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage}/>}
        <Link className={css.button} href="/notes/action/create">Create note +</Link>
      </div>
      {data?.notes !== undefined && data?.notes.length !== 0
        ? <NoteList notes={data?.notes} />
        : <p className={css.empty}>Notes not found.</p>}
    </div>
  )
}