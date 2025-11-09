import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";
import Image from "next/image";

interface Props {
  item: string;
}

export default function TravellersStoriesItem({ item }: Props) {
  return (
    <div className={css.storyCard}>
      <Image
        src="https://isorepublic.com/wp-content/uploads/2018/11/shotstash_0078-1-1100x734.jpg"
        alt="Photo of place"
        width={335}
        height={223}
        className={css.avatar}
      />
      <div className={css.infoBlock}>
        <div className={css.regionCountryStory}>
          <p className={css.storyCountry}>Європа</p>
          <h4 className={css.storyHeading}>
            Венеція без туристів: маршрути для справжніх мандрівників
          </h4>
          <p className={css.storyText}>
            Венеція — це не лише площа Святого Марка і гондоли на Канале Ґранде.
            Ми вирішили дослідити місто з іншого місця на карті
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
            <p className={css.data}>27.03.25 . 5 []</p>
          </div>
        </div>
        <div className={css.buttons}>
          <Link className={css.link} href="/stories/1">
            Переглянути статтю
          </Link>
          <button className={css.favorButton}>[]</button>
        </div>
      </div>
    </div>
    // <p>StoryCard {item}</p>
  );
}
