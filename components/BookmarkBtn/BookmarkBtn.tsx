"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import css from "./BookmarkBtn.module.css";
import { addFavorite, deleteFavorite } from "@/lib/api/clientApi";

type Props = {
  storyId: string;
  initialFavoriteCount: number;
  isFavorited: boolean;
  isAuthenticated: boolean;
  onChange?: (newCount: number, newFavorited: boolean) => void;
};

export const BookmarkBtn = ({
  storyId,
  initialFavoriteCount,
  isFavorited: initialIsFavorited,
  isAuthenticated,
  onChange,
}: Props) => {
  // const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(initialIsFavorited);
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);

  const router = useRouter();

  const handleClick = async () => {
    if (!isAuthenticated) {
      router.push("/auth/register");
      return;
    }

    try {
      if (favorited) {
        // видаляємо з фаворитів
        await deleteFavorite(storyId);
        setFavoriteCount((prev) => prev - 1);
        setFavorited(false);
        if (onChange) onChange(favoriteCount - 1, false);
      } else {
        // додаємо в фаворити
        await addFavorite(storyId);
        setFavoriteCount((prev) => prev + 1);
        setFavorited(true);
        if (onChange) onChange(favoriteCount + 1, true);
      }
    } catch (err) {
      toast.error("Помилка сервера");
    }
  };

  return (
    <button onClick={handleClick} className={`${css.button} ${css.icon}`}>
      <svg className={css.iconBookmarkBtn} width="15" height="18">
        <use href="/icons.svg#icon-bookmark"></use>
      </svg>
    </button>
  );
};
