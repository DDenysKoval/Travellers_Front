"use client";

import { useState, useEffect } from "react";
import TravellersStories from "./TravellersStories";
import { Story } from "@/types/story";
import css from "./TravellersStories.module.css";

interface Props {
  stories: Story[];
}
export default function TravellersStoriesPaginated({ stories }: Props) {
  const getInitialCount = () => {
    if (typeof window === "undefined") return 6; 

    if (window.innerWidth < 768) return 6;      
    if (window.innerWidth < 1440) return 4;     
    return 6;                                   
  };

  const [visibleCount, setVisibleCount] = useState(getInitialCount());
  const [increment, setIncrement] = useState(getInitialCount());
  useEffect(() => {
    const updateCounts = () => {
      const count = getInitialCount();
      setVisibleCount(count);
      setIncrement(count);
    };

    window.addEventListener("resize", updateCounts);
    return () => window.removeEventListener("resize", updateCounts);
  }, []);

  const visibleStories = stories.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + increment);
  };

  return (
    <div className={css.buttonContainer}>
      <TravellersStories stories={visibleStories} />

      {visibleCount < stories.length && (
        <button
          onClick={handleLoadMore}
          className={css.loadMoreButton}
        >
          Показати ще
        </button>
      )}
    </div>
  );
}
