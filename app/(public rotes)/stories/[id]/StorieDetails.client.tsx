"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById, addStoryToFavourite } from "@/lib/api/clientApi";
import css from "./StorieDetails.module.css";
import { useState } from "react";
import StoryIdDetails from "@/components/StoryIdDetails/StoryIdDetails";
import PopularStories from "@/components/PopularStories/PopularStories";
import { SyncLoader } from "react-spinners";

const StorieDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    retry: false,
  });
  const mutation = useMutation({
    mutationFn: (storieId: string) => addStoryToFavourite(storieId),
    onSuccess: () => {
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ["note", id] });
    },
  });

  const handleSave = () => {
    mutation.mutate(id);
  };

  if (error || !data)
    return (
      <SyncLoader
        color="#000000"
        loading={true}
        cssOverride={{
          display: "flex",
          justifyContent: "center",
          margin: "20px auto",
          opacity: "0.3",
        }}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );

  const story = data.data;

  return (
    <div className={css.container}>
      <h2 className={css.title}>{story?.title}</h2>

      <StoryIdDetails story={story} saved={saved} onSave={handleSave} />

      <PopularStories limit={3} />
    </div>
  );
};

export default StorieDetailsClient;
