import React from "react";
import { motion } from "framer-motion";
import { Button } from "../layout/ui/Button.jsx";

export function Hero() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-48 overflow-hidden bg-secondary">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Premium Shoes for Every Step
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            Crafted for style, engineered for comfort. Discover your next favorite pair of shoes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <Button size="lg" className="rounded-full px-8 text-base h-14" onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Shop Now
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-0 pointer-events-none" />
    </section>
  );
}