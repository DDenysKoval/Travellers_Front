"use client";

import { useState, useEffect } from "react";
import { fetchStories } from "@/lib/api/clientApi";
import { StorieListResponse, Storie } from "@/types/stories";
import StorieList from "../StorieList/StorieList";
import Loading from "@/app/loading";
import css from "./popularStories.module.css";

export default function PopularStories() {
  const type = "popular";

  const [perPage, setPerPage] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [allStories, setAllStories] = useState<Storie[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1440) return 3; // десктоп
      if (width >= 768) return 4; // планшет
      return 3; // мобільний
    };

    const initialPerPage = getPerPage();
    setPerPage(initialPerPage);
  }, []);

  useEffect(() => {
    if (perPage !== null) {
      fetchNextPage(1, perPage);
    }
  }, [perPage]);

  const fetchNextPage = async (
    currentPage = page,
    currentPerPage = perPage!
  ) => {
    if (loading || !hasNextPage || currentPerPage === null) return;
    setLoading(true);
    try {
      const data: StorieListResponse = await fetchStories(
        currentPage,
        currentPerPage,
        "",
        type
      );

      setAllStories((prev) => [
        ...prev,
        ...data.stories.filter((s) => !prev.some((p) => p._id === s._id)),
      ]);
      setPage((prev) => prev + 1);
      setHasNextPage(data.hasNextPage);
    } catch (err) {
      console.error("Помилка завантаження:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newPerPage = width >= 1440 ? 3 : width >= 768 ? 4 : 3;
      setPerPage(newPerPage);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (perPage === null) return <Loading />;

  return (
    <section className={css.sectionPopularStories}>
      <div className="container">
        <h2 className={css.titleStorie}>Популярні історії</h2>
        <StorieList stories={allStories} />

        {loading && <Loading />}
        {!loading && hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={loading}
            className={css.popularStoriesBtn}
          >
            Переглянути всі
          </button>
        )}
      </div>
    </section>
  );
}
