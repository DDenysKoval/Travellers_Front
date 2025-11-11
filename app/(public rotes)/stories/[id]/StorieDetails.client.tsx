"use client";

import PopularStories from "@/components/PopularStories/PopularStories";
import css from "./StorieDetails.module.css";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useState } from "react";

import Image from "next/image";

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
      <div className={css.meta}>
        <span className={css.owner}>Автор статті: {story.ownerId}</span>
        <span className={css.date}>
          Опубліковано: {new Date(story.publishedAt).toLocaleDateString()}
        </span>
        <span className={css.category}>{story.category}</span>
      </div>
      {story.img && (
        <div className={css.imageWrapper}>
          <Image
            src={story.img}
            alt={story.title}
            width={800} // або бажана ширина
            height={500} // або бажана висота
            className={css.image}
            priority // якщо хочеш пріоритетне завантаження для LCP
          />
        </div>
      )}
      <p className={css.description}>{story.description}</p>
      <div className={css.saveBlock}>
        <h2 className={css.saveTitle}>Збережіть собі історію</h2>
        <p className={css.saveDescription}>
          Вона буде доступна у вашому профілі у розділі збережене.
        </p>
        <button
          className={css.saveButton}
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending || saved}
        >
          {saved ? "Збережено" : "Зберегти"}
        </button>
      </div>
      <PopularStories />
    </div>
  );
};

export default StorieDetailsClient;
