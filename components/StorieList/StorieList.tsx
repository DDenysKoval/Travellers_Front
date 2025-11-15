"use client";

import { Storie, StorieWithFavorite } from "@/types/stories";
import css from "./StorieList.module.css";
import Link from "next/link";
import { BookmarkBtn } from "../BookmarkBtn/BookmarkBtn";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import { getFavorite } from "@/lib/api/clientApi";

type Props = {
  stories: Storie[];
};

const StorieList = ({ stories }: Props) => {
  const { isAuthenticated, user } = useAuthStore();
  const [storyList, setStoryList] = useState<StorieWithFavorite[]>([]);

  console.log(isAuthenticated, user);

  useEffect(() => {
    const load = async () => {
      if (!isAuthenticated) {
        // якщо юзер не авторизований — всі false
        setStoryList(stories.map((s) => ({ ...s, isFavorited: false })));
        return;
      }

      const { data: favorites } = await getFavorite();

      const updated = stories.map((s) => ({
        ...s,
        isFavorited: favorites.includes(s._id),
      }));

      setStoryList(updated);
    };

    load();
  }, [stories, isAuthenticated]);

  return (
    <ul className={css.list}>
      {storyList.map((storie) => (
        <li key={storie._id} className={css.listStorie}>
          <img
            className={css.imgStorie}
            src={storie.img}
            alt={storie?.title || "Автор невідомий"}
          ></img>

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
              <img
                className={css.avatar}
                src={storie.ownerId.avatarUrl}
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
              initialFavoriteCount={storie.favoriteCount || 0}
              isFavorited={storie.isFavorited || false} // прапорець чи користувач вже зберіг статтю
              isAuthenticated={isAuthenticated} // true, якщо юзер авторизований
              onChange={(newCount, newFavorited) => {
                // тут можна оновити стан у StorieList, якщо потрібно
                storie.favoriteCount = newCount;
                storie.isFavorited = newFavorited;
              }}
            />
            {/* <Link href="/auth/register" className={`${css.button} ${css.icon}`}>
              <svg className={css.iconBookmarkBtn} width="15" height="18">
                <use href="/icons.svg#icon-bookmark"></use>
              </svg>
            </Link> */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StorieList;
