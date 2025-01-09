import Hero from "./components/Hero";
import Nav from "./components/Nav";
import MarketplacePlatform from "./components/MarketPlacePlatform";
import FaQs from "./components/FaQs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <MarketplacePlatform />
      <FaQs />
      <Footer />
    </>
  );
}
