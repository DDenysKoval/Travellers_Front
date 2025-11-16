import Image from "next/image";
import css from "./StoryIdDetails.module.css";
import { User, Category } from "@/types/story";

interface Props {
  story: {
    _id: string;
    img: string;
    title: string;
    article: string;
    category: Category | null;
    author: User | null;
    date: string;
    favoriteCount: number;
  };
  saved: boolean;
  onSave: () => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function StoryDetails({ story, saved, onSave }: Props) {
  return (
    <div className={css.details}>
      <div className={css.meta}>
        <div className={css.content}>
          <p className={css.author}>
            <span className={css.mainStyle}>Автор статті</span>
            {story.author?.name || "Невідомий автор"}
          </p>
          <p className={css.date}>
            <span className={css.mainStyle}> Опубліковано</span>
            {formatDate(story.date)}
          </p>
        </div>
        <div className={css.categoryWraper}>
          <p className={css.category}>
            <span className={css.categoryStyle}> </span>
            {story.category?.name || "Без категорії"}
          </p>
        </div>
      </div>
      <div className={css.imageWrapper}>
        <Image src={story.img} alt={story.title} fill className={css.image} />
      </div>
      <div className={css.form}>
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
    </div>
  );
}
