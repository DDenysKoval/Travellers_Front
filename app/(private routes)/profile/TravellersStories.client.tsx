"use client";

import TravellersStories from "@/components/TravellersStories/TravellersStories";
import { Story } from "@/types/story";
import css from "./ProfilePage.module.css";
import { useState } from "react";
import TravellersMyStories from "@/components/TravellersStories/TravellersMyStories";
import { Owner } from "@/types/owner";

interface TravellerStoriesClientProps {
  myStories: Story[];
  favouriteStories: Story[];
  owner: Owner;
}

const TravellerStoriesClient = ({
  myStories,
  favouriteStories,
  owner,
}: TravellerStoriesClientProps) => {
  const [activeTab, setActiveTab] = useState<"my" | "fav">("my");

  return (
    <>
      <div className={css.switchWrapper}>
        <button
          type="button"
          onClick={() => setActiveTab("fav")}
          className={`${css.button} ${activeTab === "fav" ? css.active : ""}`}
        >
          Збережені історії
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("my")}
          className={`${css.button} ${activeTab === "my" ? css.active : ""}`}
        >
          Мої історії
        </button>
      </div>
      {activeTab === "fav" ? (
        <TravellersStories stories={favouriteStories} />
      ) : (
        <TravellersMyStories stories={myStories} owner={owner} />
      )}
    </>
  );
};

export default TravellerStoriesClient;
