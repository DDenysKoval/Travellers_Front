"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./BookmarkBtn.module.css";
// import { addFavorite, deleteFavorite } from "@/lib/api/clientApi";

type Props = {
  storyId: string;
  isFavorited: boolean;
  isAuthenticated: boolean;
  onToggle: (storyId: string, increment: number, isFav: boolean) => void;
};

export const BookmarkBtn = ({
  storyId,
  isFavorited: initialIsFavorited,
  isAuthenticated,
  onToggle,
}: Props) => {
  const [favorited, setFavorited] = useState(initialIsFavorited);

  const router = useRouter();

  const handleClick = async () => {
    if (!isAuthenticated) {
      router.push("/auth/register");
      return;
    }

    try {
      if (favorited) {
        await deleteFavorite(storyId);
        setFavorited(false);
        onToggle(storyId, -1, false); // зменшуємо count, вимикаємо прапорець
      } else {
        await addFavorite(storyId);
        setFavorited(true);
        onToggle(storyId, 1, true); // збільшуємо count, включаємо прапорець
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${css.button} ${css.icon} ${favorited ? css.active : ""}`}
    >
      <svg className={css.iconBookmarkBtn} width="15" height="18">
        <use href="/icons.svg#icon-bookmark"></use>
      </svg>
    </button>
  );
};
