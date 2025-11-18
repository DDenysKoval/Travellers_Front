"use client";

import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchStories, Storie, StorieListResponse } from "@/lib/api/clientApi";
import { Story } from "@/types/story";
import Loading from "@/app/loading";
import TravellersStories from "../TravellersStories/TravellersStories";
import css from "./popularStories.module.css";

interface Props {
  limit?: number;
}

export default function PopularStories({ limit }: Props) {
  const type = "popular";

  const [perPage, setPerPage] = useState(3);

  // Перевірка ширини екрану
  const getPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 3;
    if (width >= 768) return 4;
    return 3;
  };

  useEffect(() => {
    const handleResize = () => setPerPage(getPerPage());
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Infinite Query
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["stories", perPage, type],
    queryFn: ({ pageParam = 1 }) => fetchStories(pageParam, perPage, "", type),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const allStories = data ? data.pages.flatMap((page) => page.stories) : [];

  // Приводимо до Story[], щоб TS не скаржився
  const storiesForComponent: Story[] = allStories.map((s) => ({
    ...s,
    category: s.category
      ? { _id: String(s.category._id), name: s.category.name }
      : null,
    author: s.author ?? null,
  }));

  return (
    <section className={css.sectionPopularStories}>
      <div className="container">
        <h2 className={css.titleStorie}>Популярні історії</h2>

        {storiesForComponent.length === 0 && isFetching ? (
          <Loading />
        ) : (
          <TravellersStories stories={storiesForComponent} />
        )}

        {storiesForComponent.length > 0 && isFetching && <Loading />}

        {!limit && hasNextPage && !isFetching && (
          <button
            onClick={() => fetchNextPage()}
            className={css.popularStoriesBtn}
          >
            Переглянути всі
          </button>
        )}
      </div>
    </section>
  );
}
