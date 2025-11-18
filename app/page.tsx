import Hero from "@/components/Hero/Hero";
import css from "./page.module.css";
import About from "@/components/About/About";
import PopularStories from "@/components/PopularStories/PopularStories";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import Join from "@/components/Join/Join";
import Header from "@/components/Header/Header";

export default async function MainPage() {
  return (
    <main>
      <section className="heroSection">
        <div className="heroWrapper">
          <Header variant="hero" />
          <Hero />
        </div>
      </section>
      <About />
      <PopularStories />
      <OurTravellers />
      <Join />
    </main>
  );
}
