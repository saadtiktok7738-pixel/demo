import React from "react";

export function Footer() {
  return (
    <footer className="w-full py-8 border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ShoeVerse. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-primary/80 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary/80 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-primary/80 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}