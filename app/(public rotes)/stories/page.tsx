"use client";

import { useState, useEffect } from "react";
import { fetchStories } from "@/lib/api/clientApi";
import { StorieListResponse, Storie } from "@/types/stories";
import Loading from "@/app/loading";
import css from "./StoriesPage.module.css";
import { useSearchParams } from "next/navigation";
import StorieList from "@/components/StorieList/StorieList";
import Categories from "@/components/Categories/Categories";

export default function StoriesPage() {
  const [perPage, setPerPage] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [allStories, setAllStories] = useState<Storie[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const getPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1440) return 9;
      if (width >= 768) return 8;
      return 9;
    };

    setPerPage(getPerPage());
  }, []);

  // основна функція запиту
  const fetchNextPage = async (
    pageToLoad: number,
    perPageVal: number,
    category: string
  ) => {
    setLoading(true);
    try {
      const data: StorieListResponse = await fetchStories(
        pageToLoad,
        perPageVal,
        category
      );
      console.log(data);

      setAllStories((prev) => [
        ...prev,
        ...data.stories.filter((s) => !prev.some((p) => p._id === s._id)),
      ]);

      setHasNextPage(data.hasNextPage);
      setPage(pageToLoad + 1);
    } catch (err) {
      console.error("Помилка:", err);
    } finally {
      setLoading(false);
    }
  };

  // перше завантаження
  useEffect(() => {
    if (perPage !== null) {
      setAllStories([]); // очищаємо
      setPage(1); // починаємо з першої сторінки
      setHasNextPage(true);
      fetchNextPage(1, perPage, category);
    }
  }, [perPage, category]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newPerPage = width >= 1440 ? 9 : width >= 768 ? 8 : 9;
      setPerPage(newPerPage);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (perPage === null) return <Loading />;

  return (
    <main>
      <section className={css.sectionStories}>
        <div className="container">
          <h2 className={css.titleStorie}>Історі мандрівників</h2>
          {/* <Categories /> */}
          <StorieList stories={allStories} />
          {loading && <Loading />}
          {!loading && hasNextPage && (
            <button
              onClick={() => fetchNextPage(page, perPage, category)}
              disabled={loading}
              className={css.StoriesBtn}
            >
              Показати ще
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
