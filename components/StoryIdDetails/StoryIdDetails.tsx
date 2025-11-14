import Image from "next/image";
import css from "./StoryIdDetails.module.css";

interface Props {
  story: {
    _id: string;
    img: string;
    title: string;
    article: string;
    category: string;
    ownerId?: string;
    date: string;
    favoriteCount: number;
  };
  saved: boolean;
  onSave: () => void;
}

export default function StoryDetails({ story, saved, onSave }: Props) {
  return (
    <div className={css.details}>
      <div className={css.meta}>
        <div className={css.content}>
          <p className={css.author}>
            <span className={css.mainStyle}>Автор статті</span>Ім'я автора
            {/* {story.ownerId} */}
          </p>
          <p className={css.date}>
            <span className={css.mainStyle}> Опубліковано</span>23.07.2025{" "}
            {/* {story.date} */}
          </p>
        </div>
        <div className={css.categoryWraper}>
          <p className={css.category}>
            <span className={css.categoryStyle}> Категорія </span>
            {/* {story.category} */}
          </p>
        </div>
      </div>
      <div className={css.imageWrapper}>
        <Image
          src={story.img}
          alt={story.title}
          width={335}
          height={233}
          className={css.image}
        />
      </div>

      <p className={css.description}>{story.article}</p>
      <div className={css.saveBlock}>
        <h2 className={css.saveTitle}>Збережіть собі історію</h2>

        <p className={css.saveDescription}>
          Вона буде доступна у вашому профілі у розділі збережене.
        </p>

        <button onClick={onSave} disabled={saved} className={css.saveButton}>
          {saved ? "Збережено" : "Зберегти"}
        </button>
      </div>
    </div>
  );
}
