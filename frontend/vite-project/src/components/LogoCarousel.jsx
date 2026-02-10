import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- DATA: LOGOS ---
const LOGOS = [
  { 
    name: "IIT Bombay", 
    src: "/logos/iitb.png", // Make sure this file exists in public/logos/
    bg: "bg-indigo-50" 
  },
  { 
    name: "DTU", 
    src: "/logos/dtu.png", 
    bg: "bg-orange-50" 
  },
  { 
    name: "NIT Trichy", 
    src: "/logos/nitt.png", 
    bg: "bg-blue-50" 
  },
  { 
    name: "NSUT", 
    src: "/logos/nsut.png", 
    bg: "bg-orange-50" 
  },
  { 
    name: "IIIT-Delhi", 
    src: "/logos/iiitd.png", 
    bg: "bg-teal-50" 
  },
  { 
    name: "IGDTUW", 
    src: "/logos/igdtuw.png", 
    bg: "bg-green-50" 
  },
  { 
    name: "BITS Pilani", 
    src: "/logos/bits.svg.png", 
    bg: "bg-purple-50" 
  },
];

export default function LogoCarousel() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section 
      ref={containerRef} 
      className="py-20 bg-white border-y border-slate-100 overflow-hidden relative"
    >
      <div className="text-center mb-12">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Trusted Data from India's Top Institutes
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <motion.div 
          style={{ x }} 
          className="flex gap-8 w-max px-4"
        >
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-5 px-10 py-6 rounded-3xl border-2 border-slate-100 shadow-sm min-w-[320px] justify-center transition-colors hover:border-indigo-200 ${logo.bg}`}
            >
              {/* 👇 UPDATED: Uses Image instead of Text */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-sm p-2 overflow-hidden">
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <span className={`font-bold text-2xl text-slate-800 whitespace-nowrap`}>
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}