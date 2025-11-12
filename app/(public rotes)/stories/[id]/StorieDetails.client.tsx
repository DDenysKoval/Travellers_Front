"use client";

import PopularStories from "@/components/PopularStories/PopularStories";
import css from "./StorieDetails.module.css";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useState } from "react";
import StoryIdDetails from "@/components/StoryIdDetails/StoryIdDetails";

const StorieDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);

  const {
    data: story,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["story", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const mutation = useMutation({
    // mutationFn: (storyId: string) => saveStoryById(storyId),
    onSuccess: () => {
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ["story", id] });
    },
  });
  const handleSave = () => {
    if (!id) return;
    mutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;

  if (error || !story) return <p>Some error..</p>;

  return (
    <div>
      <h1 className={css.title}>{story.title}</h1>
      <StoryIdDetails
        story={story}
        saved={saved}
        saving={mutation.isPending}
        onSave={handleSave}
      />
      <PopularStories />
    </div>
  );
};

export default StorieDetailsClient;
