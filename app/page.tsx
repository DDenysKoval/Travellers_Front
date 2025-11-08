import Hero from "@/components/Hero/Hero";
import css from "./page.module.css";
import About from "@/components/About/About";
import PopularStories from "@/components/PopularStories/PopularStories";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import Join from "@/components/Join/Join";

export default function MainPage() {
  return (
    <main>
      <Hero />
      <About />
      <PopularStories />
      <OurTravellers />
      <Join />
    </main>
  );
}
