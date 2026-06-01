import React from "react";
import { Link } from "wouter";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          ShoeVerse
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Home
          </Link>
          <a href="#products" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Products
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary/80 transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}