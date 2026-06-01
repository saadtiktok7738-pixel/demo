import React from "react";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="w-full py-24 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Story</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
            ShoeVerse was born from a simple idea: that premium footwear shouldn't require a compromise between style, comfort, and accessibility. We source the finest materials and partner with master craftsmen to create shoes that support your journey, wherever it takes you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}