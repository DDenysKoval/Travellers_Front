import TravellersList from "@/components/TravellersList/TravellersList";
import css from "./TravellersPage.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travellers",
  description: "Our Travellers List",
  openGraph: {
    title: "Travellers",
    description: " Travellers List",
    url: `${process.env.NEXT_PUBLIC_API_URL}/travellers`,
    images: [
      {
        url: "https://res.cloudinary.com/dsr7znzlu/image/upload/v1762789255/Podorozhnuky_kznt8n.webp ",
        width: 1440,
        height: 900,
        alt: "Podorozhnuky",
      },
    ],
  },
};

const TravellersPage = () => {
  return (
    <main>
      <section className={css.section}>
        <div className="container">
          <h2 className={css.TravellersPageTitle}>Мандрівники</h2>
          <TravellersList limit={12} />
        </div>
      </section>
    </main>
  );
};

export default TravellersPage;
