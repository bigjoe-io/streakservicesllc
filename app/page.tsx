import Image from "next/image";
import Header from "./components/header";
import HeroSection from "./components/hero-section";
import PageSections from "./components/page-section";
import ContactSection from "./components/contact-us-section";
import Footers from "./components/footer";


export default function Home() {
  return (
   <main>
    <Header/>
    <HeroSection/>
    <PageSections/>
    <ContactSection/>
    <Footers/>
   
   </main>
  );
}
