import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
// import TravellersStories from "@/components/TravellersStories/TravellersStories";
import {
  fetchServerFavouriteStories,
  fetchServerMyStories,
  getServerMe,
} from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";
import TravellerStoriesClient from "./TravellersStories.client";

export default async function ProfilePage() {
  const owner = await getServerMe();
  const myStories = await fetchServerMyStories();
  const favouriteStories = await fetchServerFavouriteStories();

  return (
    <main>
      <section className={css.section}>
        <div className="container">
          <TravellerInfo owner={owner.data} />
          <TravellerStoriesClient
            myStories={myStories}
            favouriteStories={favouriteStories}
          />
        </div>
      </section>
    </main>
  );
}
