"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({ title, subtitle, center = true }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${center ? "text-center" : "text-left"}`}>
      <div className={`flex items-center ${center ? "justify-center" : "justify-start"} gap-4 md:gap-8`}>
        {/* Left Line */}
        <div className={`hidden lg:block h-0.5 bg-linear-to-l from-lightblue via-cyan-500 to-transparent flex-1`} />
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-darkblue tracking-tight"
        >
          {title.split(' ').map((word, i) => {
            const words = title.split(' ');
            const isLast = i === words.length - 1;
            const isReachUs = title.toLowerCase().endsWith('reach us') && (i === words.length - 2 || i === words.length - 1);
            return (
              <span key={i} className={isLast || isReachUs ? "text-yellow" : ""}>
                {word}{' '}
              </span>
            );
          })}
        </motion.h2>

        {/* Right Line */}
        <div className={`hidden lg:block h-0.5 bg-linear-to-r from-lightblue via-cyan-500 to-transparent flex-1`} />
      </div>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
