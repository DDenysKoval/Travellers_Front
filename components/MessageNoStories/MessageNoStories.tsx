import { usePathname } from "next/navigation";
import css from "./MessageNoStories.module.css";
import Link from "next/link";

interface Props {
  text: string;
  buttonText: string;
}

export default function MessageNoStories({ text, buttonText }: Props) {
  const parh = usePathname();

  return (
    <div className={css.extContainer}>
      <div className={css.noStoriesContainer}>
        <p className={css.noStoriesText}>{text}</p>
        <Link
          href={parh.includes("travellers") ? "/stories" : "/stories/create"}
          className={css.noStoriesButton}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
