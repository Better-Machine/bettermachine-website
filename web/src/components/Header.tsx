"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Studio", href: "#studio" },
  { label: "Projects", href: "#projects" },
  { label: "Agents", href: "#agents" },
  { label: "Blog", href: "#blog" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-void/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo-lockup-dark.png"
              alt="Better Machine"
              width={140}
              height={32}
              className="h-6 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-silver hover:text-offwhite transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="#contact"
            className="text-sm px-4 py-2 border border-copper/50 text-copper hover:bg-copper hover:text-void transition-all duration-200"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}
