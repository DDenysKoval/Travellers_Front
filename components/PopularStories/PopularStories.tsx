"use client";

import { useState, useEffect } from "react";
import { fetchStories } from "@/lib/api/clientApi";
import { StorieListResponse, Storie } from "@/types/story";
import StorieList from "../StorieList/StorieList";
import Loading from "@/app/loading";
import css from "./popularStories.module.css";

export default function PopularStories() {
  const type = "popular";

  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(1);
  const [allStories, setAllStories] = useState<Storie[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const getPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 3; // десктоп
    if (width >= 768) return 4; // планшет
    return 3; // мобільний
  };

  useEffect(() => {
    setPerPage(getPerPage());
  }, []);

  //////////Завантаження першої сторінки
  useEffect(() => {
    loadFirstPage();
  }, [perPage]);

  const loadFirstPage = async () => {
    setLoading(true);
    setPage(1);
    setHasNextPage(true);
    if (perPage !== null) {
      try {
        const data: StorieListResponse = await fetchStories(
          1,
          perPage,
          "",
          type
        );

        setAllStories(data.stories);
        setHasNextPage(data.hasNextPage);
      } catch (err) {
        console.error("Помилка завантаження:", err);
      } finally {
        setLoading(false);
      }
    }
  };
  ////////////////Завантаження наступних сторінок
  const loadMore = async () => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    if (perPage !== null)
      try {
        const nextPage = page + 1;
        const data: StorieListResponse = await fetchStories(
          nextPage,
          perPage,
          "",
          type
        );
        console.log(data);

        // фільтруємо дублікати
        const uniqueStories = data.stories.filter(
          (s) => !allStories.some((p) => p._id === s._id)
        );

        setAllStories((prev) => [...prev, ...uniqueStories]);
        setPage(nextPage);
        setHasNextPage(data.hasNextPage);
      } catch (err) {
        console.error("Помилка завантаження:", err);
      } finally {
        setLoading(false);
      }
  };

  ////////////Перезавантаження при зміні ширини екрана
  useEffect(() => {
    const handleResize = () => {
      const newPerPage = getPerPage();
      setPerPage(newPerPage); // це автоматично викличе loadFirstPage()
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!allStories.length && loading) return <Loading />;
  // if (perPage === null) return <Loading />;

  return (
    <section className={css.sectionPopularStories}>
      <div className="container">
        <h2 className={css.titleStorie}>Популярні історії</h2>
        <StorieList stories={allStories} />

        {loading && <Loading />}
        {!loading && hasNextPage && (
          <button
            onClick={loadMore}
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
