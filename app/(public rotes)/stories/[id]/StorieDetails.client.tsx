"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import css from "./StorieDetails.module.css";
import { useState } from "react";
import StoryIdDetails from "@/components/StoryIdDetails/StoryIdDetails";
import PopularStories from "@/components/PopularStories/PopularStories";

const StorieDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const mutation = useMutation({
    mutationFn: () => saveStory(id),
    onSuccess: () => {
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ["note", id] });
    },
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error || !data) return <p>Помилка завантаження історії</p>;

  const story = data.data;

  return (
    <div className={css.container}>
      <h2 className={css.title}>{story.title}</h2>

      <StoryIdDetails
        story={story}
        saved={saved}
        onSave={() => mutation.mutate()}
      />
      <PopularStories />
    </div>
  );
};

export default StorieDetailsClient;
