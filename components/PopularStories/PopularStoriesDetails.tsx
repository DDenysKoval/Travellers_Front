"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStories } from "@/lib/api/clientApi";
import Loading from "@/app/loading";
import css from "./popularStories.module.css";
import { Story, StorieListResponse } from "@/types/story";
import TravellersStories from "../TravellersStories/TravellersStories";

interface Props {
  limit?: number;
}

export default function PopularStoriesDetails({ limit }: Props) {
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

  useEffect(() => {
    const handleResize = () => {
      const newPerPage = getPerPage();
      setPerPage(newPerPage);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Скидання при зміні perPage
  useEffect(() => {
    setPage(1);
    setAllStories([]);
    setHasNextPage(true);
  }, [perPage]);

  // React Query
  const { data, isFetching } = useQuery<StorieListResponse>({
    queryKey: ["stories", page, perPage, type],
    queryFn: () => fetchStories(page, perPage, "", type),
  });

  // Оновлення списку історій
  useEffect(() => {
    if (data?.data?.stories) {
      setAllStories((prev) => {
        const newStories = data.data.stories.filter(
          (s) => !prev.some((prevStory) => prevStory._id === s._id)
        );
        return [...prev, ...newStories];
      });
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
      <div>
        <h2 className={css.titleStorie}>Популярні історії</h2>

        {allStories.length === 0 && isFetching ? (
          <Loading />
        ) : (
          <TravellersStories stories={allStories} />
        )}

        {allStories.length > 0 && isFetching && <Loading />}

        {!limit && hasNextPage && !isFetching && (
          <button onClick={loadMore} className={css.popularStoriesBtn}>
            Переглянути всі
          </button>
        )}
      </div>
    </section>
  );
}
