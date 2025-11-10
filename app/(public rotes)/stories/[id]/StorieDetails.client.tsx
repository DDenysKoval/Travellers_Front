"use client";

import PopularStories from "@/components/PopularStories/PopularStories";
import css from "./StorieDetails.module.css";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";

const StorieDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  return (
    <div>
      StorieDetailsClient
      <PopularStories />
    </div>
  );
};

export default StorieDetailsClient;
