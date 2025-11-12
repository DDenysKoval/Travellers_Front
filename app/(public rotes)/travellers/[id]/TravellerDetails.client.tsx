"use client";

import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import css from "./TravellerDetails.module.css";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchStories } from "@/lib/api/clientApi";
import { useMediaQuery } from "react-responsive";

export default function TravellerDetailsClient() {
  const [page, setPage] = useState(1);

  const { id } = useParams<{ id: string }>();

  const isMobile = useMediaQuery({ maxWidth: 1439 });

  const perPage = isMobile ? 4 : 6;

  const { data, isLoading, error } = useQuery({
    queryKey: ["stories", id, page, perPage],
    queryFn: () => fetchStories(page, perPage),
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className="container">
      <div className={css.traveller}>
        <TravellerInfo />
        <h2 className={css.title}>Історії Мандрівника</h2>
        <TravellersStories stories={data.stories} />
        {data.hasNextPage && (
          <button
            className={css.showNext}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Показати ще
          </button>
        )}
      </div>
    </div>
  );
}
