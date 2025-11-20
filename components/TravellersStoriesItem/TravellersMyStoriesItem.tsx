"use client";

import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";
import Image from "next/image";
import { Story } from "@/types/story";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Owner } from "@/types/owner";

interface Props {
  story: Story;
  owner: Owner;
}

export default function TravellersMyStoriesItem({ story, owner }: Props) {
  const [favoriteCount, setFavoriteCount] = useState(story.favoriteCount);

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/stories/edit/${story._id}`);
  };
  console.log(owner);

  return (
    <div className={css.storyCard}>
      <Image
        src={story.img}
        alt="Photo of place"
        width={421}
        height={280}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={css.avatar}
      />
      <div className={css.infoBlock}>
        <div className={css.regionCountryStory}>
          <p className={css.storyCountry}>
            {story.category ? story.category.name : ""}
          </p>
          <h4 className={css.storyHeading}>{story?.title || ""}</h4>
          <p className={css.storyText}>{story?.article || ""}</p>
        </div>

        <div className={css.favouriteInfo}>
          <Image
            src={
              owner.avatarUrl?.trim()
                ? owner.avatarUrl
                : "https://res.cloudinary.com/dsr7znzlu/image/upload/v1763546472/Avatar_Default_aq5ti4.png"
            }
            alt="User Avatar"
            width={48}
            height={48}
            className={css.photoTraveller}
          />

          <div>
            <p className={css.name}>{story.ownerId?.name || ""}</p>
            <div className={css.datecontainer}>
              <p className={css.data}>
                {story.date.split("T")[0]} • {favoriteCount}
              </p>
              <svg width="16" height="16">
                <use href="/icons.svg#icon-bookmark"></use>
              </svg>
            </div>
          </div>
        </div>
        <div className={css.buttons}>
          <Link
            className={`${css.buttonEfect} ${css.link}`}
            href={`/stories/${story._id}`}
          >
            Переглянути статтю
          </Link>
          <button
            className={`${css.favorButton} ${css.buttonEfect} ${isFavourite ? css.favorButtonPush : ""}`}
            onClick={handleClick}
          >
            <svg className={isFavourite ? css.icon : ""} width="24" height="24">
              <use href="/icons.svg#icon-edit"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
