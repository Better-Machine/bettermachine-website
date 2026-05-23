"use client";

import Link from "next/link";

const footerLinks = {
  studio: [
    { label: "About", href: "#studio" },
    { label: "Projects", href: "#projects" },
    { label: "Agents", href: "#agents" },
    { label: "Blog", href: "#blog" },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com/Better-Machine" },
    { label: "X", href: "https://x.com" },
  ],
};

export function Footer() {
  return (
    <footer className="py-20 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-medium text-[#FAFAFA] mb-4">
              better machine
            </h3>
            <p className="text-[#A0A0A0] max-w-md mb-6">
              A native startup lab applying leading-edge AI to deliver creative 
              business solutions with passion, idealism, and capitalism.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#B87333] rounded-full animate-pulse"></span>
              <span className="text-[#B87333] text-sm">All systems operational</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#FAFAFA] font-medium mb-4">Studio</h4>
            <ul className="space-y-3">
              {footerLinks.studio.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#A0A0A0] hover:text-[#B87333] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#FAFAFA] font-medium mb-4">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A0A0A0] hover:text-[#B87333] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#A0A0A0] text-sm">
            © {new Date().getFullYear()} Better Machine. Built by agents.
          </p>
          <p className="text-[#A0A0A0]/50 text-xs font-mono">
            Running on mesh-memory v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
