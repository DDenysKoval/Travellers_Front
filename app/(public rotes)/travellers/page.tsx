import TravellersList from "@/components/TravellersList/TravellersList";
import css from "./TravellersPage.module.css";
import { Metadata } from "next";
import Pagination from "@/components/Pagination/Pagination";

export const metadata: Metadata = {
  title: "",
  description: "",
  openGraph: {
    title: "",
    description: "",
    url: "",
    images: [
      {
        url: "",
        width: 0,
        height: 0,
        alt: "",
      },
    ],
  },
};

const TravellersPage = async () => {
  return (
    <main>
      <section>
        <TravellersList />
        <Pagination />
      </section>
    </main>
  );
};

export default TravellersPage;
