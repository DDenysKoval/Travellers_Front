"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStories } from "@/lib/api/clientApi";
import Loading from "@/app/loading";
import css from "./popularStories.module.css";
import { Story, StorieListResponse } from "@/types/story";
import TravellersStories from "../TravellersStories/TravellersStories";

export default function PopularStories() {
  const type = "popular";

  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(1);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Перевірка ширини
  const getPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 3;
    if (width >= 768) return 4;
    return 3;
  };

  // При завантаженні + при зміні розміру змінюємо perPage
  useEffect(() => {
    const handleResize = () => {
      const newPerPage = getPerPage();
      setPerPage(newPerPage);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // перший виклик

    return () => window.removeEventListener("resize", handleResize);
  }, []); // 🟢 Без deps — не викликає loop

  // Якщо перPage змінюється → скидаємо все
  useEffect(() => {
    setPage(1);
    setAllStories([]);
    setHasNextPage(true);
  }, [perPage]);

  // React Query
  const { data, isFetching } = useQuery<StorieListResponse>({
    queryKey: ["stories", page, perPage, type],
    queryFn: () => fetchStories(page, perPage, "", type),
    keepPreviousData: true,
  });

  // Оновлення списку історій
  useEffect(() => {
    if (data?.data?.stories) {
      const newStories = data.data.stories.filter(
        (s) => !allStories.some((prev) => prev._id === s._id)
      );

      setAllStories((prev) => [...prev, ...newStories]);
      setHasNextPage(data.data.hasNextPage);
    }
  }, [data]);

  const loadMore = () => {
    if (hasNextPage && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className={css.sectionPopularStories}>
      <div className="container">
        <h2 className={css.titleStorie}>Популярні історії</h2>

        {allStories.length === 0 && isFetching ? (
          <Loading />
        ) : (
          <TravellersStories stories={allStories} />
        )}

        {allStories.length > 0 && isFetching && <Loading />}

        {hasNextPage && !isFetching && (
          <button onClick={loadMore} className={css.popularStoriesBtn}>
            Переглянути всі
          </button>
        )}
      </div>
    </section>
  );
}
