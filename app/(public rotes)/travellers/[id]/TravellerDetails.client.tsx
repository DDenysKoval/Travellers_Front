"use client";

import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import css from "./TravellerDetails.module.css";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchOwnerStories } from "@/lib/api/clientApi";
import { useMediaQuery } from "react-responsive";
import { useAuthStore } from "@/lib/store/authStore";


export default function TravellerDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { isAuthenticated, user } = useAuthStore();

  

  console.log(isAuthenticated, user?.favorites);

  const isMobile = useMediaQuery({ maxWidth: 1439 });

  const perPage = isMobile ? 4 : 6;

  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ["stories", id, perPage],
      queryFn: ({ pageParam = 1 }) => fetchOwnerStories(pageParam, perPage, id),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasNextPage ? pages.length + 1 : undefined;
      },
    });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !data) return <p>Something went wrong.</p>;

  const allStories = data ? data.pages.flatMap((page) => page.stories) : [];

  return (
    <div className="container">
      <div className={css.traveller}>
        <TravellerInfo owner={data.pages[0].owner} />
        <h2 className={css.title}>Історії Мандрівника</h2>
        <TravellersStories stories={allStories} />

        {hasNextPage && (
          <button onClick={() => fetchNextPage()} className={css.showNext}>
            Показати ще
          </button>
        )}
      </div>
    </div>
  );
}
