import React from "react";
import { Navbar } from "../layout/Navbar.jsx";
import { Hero } from "../layout/Hero.jsx";
import { FeaturedShoes } from "../layout/FeaturedShoes.jsx";
import { About } from "../layout/About.jsx";
import { Footer } from "../layout/Footer.jsx";
import { ChatAssistant } from "../layout/ChatAssistant.jsx";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedShoes />
        <About />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}