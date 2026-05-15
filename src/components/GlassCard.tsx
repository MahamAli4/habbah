"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3 } 
      }}
      className={`glass rounded-[2.5rem] p-8 group relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,195,0,0.15)] ${className}`}
    >
      {/* Subtle Shine Effect */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
