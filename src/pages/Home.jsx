import Hero from "../components/home/Hero";
import HeroSearch from "../components/home/HeroSearch";
import HeroStats from "../components/home/HeroStats";
import FeaturedProperties from "../components/home/FeaturedProperties";
import SearchSection from "../components/home/SearchSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import PropertyCategories from "../components/home/PropertyCategories";

function Home() {
  return (
    <main className="bg-slate-50">
      <Hero />
      <HeroSearch />
      <HeroStats />
      <FeaturedProperties />
      <SearchSection />
      <WhyChooseUs />
      <PropertyCategories />
    </main>
  );
}

export default Home;
