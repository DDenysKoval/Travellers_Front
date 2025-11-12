import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";
import Image from "next/image";
import { Story } from "@/types/story";

interface Props {
  story: Story;
}

export default function TravellersStoriesItem({ story }: Props) {
  return (
    <div className={css.storyCard}>
      <Image
        src={story.img}
        alt="Photo of place"
        width={335}
        height={223}
        className={css.avatar}
      />
      <div className={css.infoBlock}>
        <div className={css.regionCountryStory}>
          <p className={css.storyCountry}>{story.category?story.category.name:""}</p>
          <h4 className={css.storyHeading}>
            {story.title}
          </h4>
          <p className={css.storyText}>
            {story.article}
          </p>
        </div>

        <div className={css.favouriteInfo}>
          <Image
            src="https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd009.webp"
            alt="User Avatar"
            width={48}
            height={48}
            className={css.photoTraveller}
          />

          <div>
            <p className={css.name}>Анастасія Олійник</p>
            <div className={css.datecontainer}>
              <p className={css.data}>{story.date.split("T")[0]} • {story.favoriteCount}</p>
              <svg className={css.icon} width="16" height="16">
                <use href="/icons.svg#icon-bookmark"></use>
              </svg>
            </div>
          </div>
        </div>
        <div className={css.buttons}>
          <Link className={css.link} href="/stories/1">
            Переглянути статтю
          </Link>
          <button className={css.favorButton}>
            <svg className={css.icon} width="24" height="24">
              <use href="/icons.svg#icon-bookmark"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
    // <p>StoryCard {item}</p>
  );
}
