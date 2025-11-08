"use client";

import PopularStories from "@/components/PopularStories/PopularStories";
import css from "./StorieDetails.module.css";
import Pagination from "@/components/Pagination/Pagination";

const TravellerDetailsClient = () => {
  return (
    <div>
      TravellerDetailsClient
      <PopularStories />
      <Pagination />
    </div>
  );
};

export default TravellerDetailsClient;
