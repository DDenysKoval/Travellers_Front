import css from "./TravellersStories.module.css";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";

interface Props {
  testArray: string[];
}

export default function TravellersStories({ testArray }: Props) {
  return (
    <ul className={css.travellerList}>
      {testArray.map((item) => {
        return (
          <li key={item}>
            <TravellersStoriesItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}
