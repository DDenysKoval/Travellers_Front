import css from "./TravellersStories.module.css";

import { Story } from "@/types/story";
import TravellersMyStoriesItem from "../TravellersStoriesItem/TravellersMyStoriesItem";
import { Owner } from "@/types/owner";

interface Props {
  stories: Story[];
  owner: Owner;
}

export default function TravellersMyStories({ stories = [], owner }: Props) {
  return (
    <ul className={css.travellerList}>
      {stories.map((story, index) => {
        return (
          <li key={index}>
            <TravellersMyStoriesItem story={story} owner={owner} />
          </li>
        );
      })}
    </ul>
  );
}
