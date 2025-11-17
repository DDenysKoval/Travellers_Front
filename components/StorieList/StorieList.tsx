"use client";

import { Story, StorieWithFavorite } from "@/types/story";
import css from "./StorieList.module.css";
import Link from "next/link";
import { BookmarkBtn } from "../BookmarkBtn/BookmarkBtn";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
// import { getFavorite } from "@/lib/api/clientApi";
import Image from "next/image";

type Props = {
  stories: Story[];
};

const StorieList = ({ stories }: Props) => {
  const [storyList, setStoryList] = useState<StorieWithFavorite[]>([]);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  console.log("user:", user);
  console.log("Avtorith", isAuthenticated);
  /////////Завантаження фаворіт після авториації
  useEffect(() => {
    const load = async () => {
      if (!isAuthenticated) {
        // якщо юзер не авторизований — всі false
        setStoryList(stories.map((s) => ({ ...s, isFavorited: false })));
        return;
      }
      const favorites = await getFavorite();
      console.log(favorites);

      const updated = stories.map((s) => ({
        ...s,
        isFavorited: favorites.some((f) => f._id === s._id),
      }));

      setStoryList(updated);
    };

    load();
  }, [stories, isAuthenticated]);

  //// Функція для оновлення однієї історії після toggle
  const handleFavoriteToggle = (
    storyId: string,
    increment: number,
    isFav: boolean
  ) => {
    setStoryList((prev) =>
      prev.map((storie) =>
        storie._id === storyId
          ? {
              ...storie,
              isFavorited: isFav,
              favoriteCount: (storie.favoriteCount || 0) + increment,
            }
          : storie
      )
    );
  };

  return (
    <ul className={css.list}>
      {storyList.map((storie) => (
        <li key={storie._id} className={css.listStorie}>
          <Image
            className={css.imgStorie}
            src={
              storie?.img ||
              "https://ftp.goit.study/img/travel-blog/68498236a100312bea079011.webp"
            }
            width={421}
            height={280}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={storie?.title || "Автор невідомий"}
          />

          <div className={css.divContainer}>
            <p className={css.category}>
              {storie.category?.name || "Без категорії"}
            </p>
            <h3 className={css.title}>{storie?.title || "Без назви"}</h3>
            <p className={css.content}>
              {storie.article?.slice(0, 95) + "..." ||
                "Тут повинен бути опис, але його тут немає"}
            </p>
            <div className={css.divUserContainer}>
              <Image
                className={css.avatar}
                src={
                  storie.ownerId?.avatarUrl ||
                  "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd009.webp"
                }
                width={48}
                height={48}
                alt={storie.ownerId?.name || "Автор"}
              />
              <div className={css.divUser}>
                <p className={css.nameUser}>
                  {storie.ownerId?.name || "Автор невідомий"}
                </p>
                <p className={css.titleUser}>
                  {storie.date?.slice(0, 10).replace(/-/g, ".") ||
                    "Дата не відома"}
                  <span className={css.point}>•</span>
                  {storie.favoriteCount || "Невідомо"}
                  <svg className={css.iconBookmark} width="10" height="10">
                    <use href="/icons.svg#icon-bookmark"></use>
                  </svg>
                </p>
              </div>
            </div>
            <Link
              href={`/stories/${storie._id}`}
              className={`${css.button} ${css.link}`}
            >
              Переглянути статтю
            </Link>
            {/* кнопку треба доробити перевірка чи користувач зайшов, і чи додане в улюблене */}
            <BookmarkBtn
              storyId={storie._id}
              isFavorited={storie.isFavorited || false} // прапорець чи користувач вже зберіг статтю
              isAuthenticated={isAuthenticated} // true, якщо юзер авторизований
              onToggle={handleFavoriteToggle}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StorieList;
