import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import FloatingWhatsApp from '../components/Layout/FloatingWhatsApp';
import Hero from '../components/Sections/Hero';
import About from '../components/Sections/About';
import VisionMission from '../components/Sections/VisionMission';
import BestSellers from '../components/Sections/BestSellers';
import FullMenu from '../components/Sections/FullMenu';
import Reviews from '../components/Sections/Reviews';
import Contact from '../components/Sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <VisionMission />
        <BestSellers />
        <FullMenu />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
