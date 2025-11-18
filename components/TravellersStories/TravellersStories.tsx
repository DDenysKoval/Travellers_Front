import css from "./TravellersStories.module.css";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import { Story } from "@/types/story";

interface Props {
  stories: Story[];
}

export default function TravellersStories({ stories = [] }: Props) {
  return (
    <ul className={css.travellerList}>
      {stories.map((story, index) => {
        return (
          <li key={index}>
            <TravellersStoriesItem story={story} />
          </li>
        );
      })}
    </ul>
  );
}
