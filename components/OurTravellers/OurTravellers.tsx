import css from "./OurTravellers.module.css";

import TravellersList from "../TravellersList/TravellersList";

export default function OurTravellers() {
  return <section className={css.travellersSection}>
   <div className="container">
    <h2 className={css.travellersTitle}>Наші Мандрівники</h2>
      <TravellersList limit={4} />
    </div>
  </section>;
}
