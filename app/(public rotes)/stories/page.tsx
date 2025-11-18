"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStories } from "@/lib/api/clientApi";
import { Story, StorieListResponse } from "@/types/story";
import Loading from "@/app/loading";
import css from "./StoriesPage.module.css";
import Categories from "@/components/Categories/Categories";
import TravellersStories from "@/components/TravellersStories/TravellersStories";

export default function StoriesPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const getPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 9;
    if (width >= 768) return 8;
    return 9;
  };

  useEffect(() => {
    setPerPage(getPerPage());
    const handleResize = () => setPerPage(getPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isFetching } = useQuery<StorieListResponse>({
    queryKey: ["stories", page, perPage, category],
    queryFn: () => fetchStories(page, perPage, category || ""),
    keepPreviousData: true,
  });

  // Оновлюємо локальний стан при зміні даних
  useEffect(() => {
    if (data?.data?.stories) {
      const newStories = data?.data?.stories.filter(
        (s) => !allStories.some((prev) => prev._id === s._id)
      );
      setAllStories((prev) => [...prev, ...newStories]);
      setHasNextPage(data?.data?.hasNextPage);
    }
  }, [data]);

  const loadMore = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const handleCategorySelect = (id: string | null) => {
    setCategory(id);
    setPage(1);
    setAllStories([]);
  };

  if (!allStories.length && isFetching) return <Loading />;

  return (
    <main>
      <section className={css.sectionStories}>
        <div className="container">
          <h2 className={css.titleStorie}>Історії Мандрівників</h2>
          <Categories onSelect={handleCategorySelect} />
          <TravellersStories stories={allStories} />
          {isFetching && allStories.length > 0 && <Loading />}
          {!isFetching && hasNextPage && (
            <button onClick={loadMore} className={css.StoriesBtn}>
              Показати ще
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
