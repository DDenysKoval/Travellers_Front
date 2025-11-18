"use client";

import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchStories } from "@/lib/api/clientApi";
import { Story } from "@/types/story";
import Loading from "@/app/loading";
import css from "./StoriesPage.module.css";
import Categories from "@/components/Categories/Categories";
import TravellersStories from "@/components/TravellersStories/TravellersStories";

export default function StoriesPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [perPage, setPerPage] = useState(9);

  const getPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 9;
    if (width >= 768) return 8;
    return 9;
  };

  useEffect(() => {
    const resizeHandler = () => {
      const newPerPage = getPerPage();
      setPerPage(newPerPage);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["stories", perPage, category],
      queryFn: ({ pageParam = 1 }) =>
        fetchStories(pageParam, perPage, category || ""),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasNextPage ? pages.length + 1 : undefined;
      },

      initialPageParam: 1,
    });

  // Об’єднуємо всі сторінки в один масив
  const allStories: Story[] = data
    ? data.pages.flatMap((page) =>
        page.stories.map((s) => ({
          ...s,
          category: s.category
            ? { ...s.category, _id: String(s.category._id) }
            : null,
          author: s.author ?? null,
        }))
      )
    : [];

  const handleCategorySelect = (id: string | null) => {
    setCategory(id);
  };

  const isInitialLoading = isLoading && allStories.length === 0;

  return (
    <main>
      <section className={css.sectionStories}>
        <div className="container">
          <h2 className={css.titleStorie}>Історії Мандрівників</h2>

          <Categories onSelect={handleCategorySelect} />

          {isInitialLoading ? (
            <Loading />
          ) : (
            <>
              <TravellersStories stories={allStories} />

              {isFetching && <Loading />}

              {hasNextPage && !isFetching && (
                <button
                  onClick={() => fetchNextPage()}
                  className={css.StoriesBtn}
                >
                  Показати ще
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
