import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import PerformanceLab from "@/components/sections/PerformanceLab";
import ScoutMode from "@/components/sections/ScoutMode";
import MatchCinema from "@/components/sections/MatchCinema";
import FanImmersion from "@/components/sections/FanImmersion";
import SponsorZone from "@/components/sections/SponsorZone";
import LegacyWall from "@/components/sections/LegacyWall";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

export default function Home() {
  return (
    <>
      <ClientShell />
      <Navigation />
      <main>
        <Hero />
        <div className="gold-line-full" />
        <Story />
        <div className="gold-line-full" />
        <PerformanceLab />
        <div className="gold-line-full" />
        <ScoutMode />
        <div className="gold-line-full" />
        <MatchCinema />
        <div className="gold-line-full" />
        <FanImmersion />
        <div className="gold-line-full" />
        <SponsorZone />
        <div className="gold-line-full" />
        <LegacyWall />
      </main>
      <Footer />
    </>
  );
}
