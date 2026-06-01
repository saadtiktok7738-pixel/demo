import React from "react";
import { motion } from "framer-motion";
import { Button } from "../layout/ui/Button.jsx";

const products = [
  {
    id: 1,
    name: "Running Shoe",
    description: "Lightweight and breathable for daily miles.",
    price: "$129.99",
    category: "Running",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    name: "Casual Sneaker",
    description: "Classic silhouette for everyday wear.",
    price: "$89.99",
    category: "Casual",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 3,
    name: "Sports Trainer",
    description: "Maximum support for intense workouts.",
    price: "$149.99",
    category: "Sports",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

export function FeaturedShoes() {
  return (
    <section id="featured-collection" className="w-full py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Featured Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular styles, designed with premium materials and obsessive attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="group flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-product-card
              data-product-name={product.name}
              data-product-price={product.price}
              data-product-description={product.description}
              data-product-category={product.category}
            >
              <div className={`aspect-square w-full rounded-2xl bg-gradient-to-br ${product.color} relative overflow-hidden mb-6 flex items-center justify-center`}>
                <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-50 drop-shadow-xl group-hover:scale-110 transition-transform duration-500" fill="currentColor">
                  <path d="M80,60 C75,55 60,50 50,55 C40,60 25,60 20,65 C15,70 15,80 20,80 L80,80 C85,80 85,70 80,60 Z" />
                  <path d="M45,55 C50,45 60,35 65,40 C70,45 75,55 80,60 C75,55 60,50 45,55 Z" opacity="0.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" data-testid={`text-product-name-${product.id}`}>
                {product.name}
              </h3>
              <p className="text-muted-foreground mb-4 flex-grow" data-testid={`text-product-description-${product.id}`}>
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-medium" data-testid={`text-product-price-${product.id}`}>
                  {product.price}
                </span>
                <Button variant="outline" className="rounded-full" data-testid={`button-add-to-cart-${product.id}`}>
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}