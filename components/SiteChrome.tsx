"use client";

import { useState } from "react";
import HomeHeader from "./HomeHeader";
import AboutModal from "./AboutModal";
import SmoothScroll from "./SmoothScroll";
import LiquidBackground from "./LiquidBackground";

export default function SiteChrome() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <SmoothScroll />
      <HomeHeader onOpenAbout={() => setAboutOpen(true)} />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <LiquidBackground />
    </>
  );
}
