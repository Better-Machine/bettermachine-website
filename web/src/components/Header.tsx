"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ContactModal } from "./ContactForm";

const navLinks = [
  { label: "Studio", href: "/#studio" },
  { label: "Projects", href: "/#projects" },
  { label: "Agents", href: "/#agents" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-[#B87333] font-semibold tracking-wider text-lg group-hover:text-[#FAFAFA] transition-colors">BETTER MACHINE</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#A0A0A0] hover:text-[#FAFAFA] transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-sm px-4 py-2 border border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333] hover:text-[#0A0A0A] transition-all duration-200"
            >
              Get in touch
            </button>
          </div>
        </div>
      </header>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        subject="General Inquiry"
        source="Header navigation"
      />
    </>
  );
}
