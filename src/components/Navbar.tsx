"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Application Process", href: "/application-process" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between px-8 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? "glass shadow-[0_8px_32px_rgba(3,4,94,0.1)] border-white/20"
              : "bg-white/40 backdrop-blur-md border-white/10"
          }`}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-white p-1 shadow-sm group-hover:scale-110 transition-all duration-300">
              <Image 
                src="/unnamed.png" 
                alt="Habbah Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-black text-darkblue tracking-tighter">
              HABBAH
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold transition-all relative group ${
                    isActive ? "text-darkblue" : "text-gray/60 hover:text-darkblue"
                  }`}
                >
                  {link.name}
                  <span 
                    className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 bg-yellow rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} 
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="bg-darkblue text-white px-8 py-3 rounded-full font-bold hover:bg-lightblue transition-all hover:shadow-[0_10px_20px_rgba(3,4,94,0.2)] hover:-translate-y-1 active:scale-95"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-darkblue"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 md:hidden"
          >
            <div className="glass rounded-3xl p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-darkblue hover:text-lightblue"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-darkblue text-white px-6 py-3 rounded-xl font-bold text-center"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
