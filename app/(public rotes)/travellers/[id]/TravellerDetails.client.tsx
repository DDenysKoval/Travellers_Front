// "use client";

// import PopularStories from "@/components/PopularStories/PopularStories";
// import css from "./StorieDetails.module.css";
// import Pagination from "@/components/Pagination/Pagination";

// const TravellerDetailsClient = () => {
//   return (
//     <div>
//       TravellerDetailsClient
//       <PopularStories />
//       <Pagination />
//     </div>
//   );
// };

// export default TravellerDetailsClient;

"use client";

import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import css from "./TravellerDetails.module.css";
import TravellersStories from "@/components/TravellersStories/TravellersStories";

interface Props {
  testArray: string[];
}

export default function TravellerDetailsClient({ testArray }: Props) {
  return (
    <div className="container">
      <div className={css.traveller}>
        <TravellerInfo />
        <h2 className={css.title}>Історії Мандрівника</h2>
        <TravellersStories testArray={testArray} />
        <button className={css.showNext}>Показати ще</button>
      </div>
    </div>
  );
}
