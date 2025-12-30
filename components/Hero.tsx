import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Background Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop" 
          alt="Cocoa Cafe Interior" 
          className="w-full h-full object-cover scale-110"
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ y: y2 }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="h-[1px] w-12 bg-terracotta/80"></div>
            <span className="text-terracotta text-sm font-bold tracking-[0.3em] uppercase">Est. 2024 • Virar West</span>
            <div className="h-[1px] w-12 bg-terracotta/80"></div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.9] tracking-tight">
            Cocoa <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream to-terracotta italic font-light pr-2">Cafe</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-white/80 font-light max-w-xl leading-relaxed mb-12"
        >
           Where artisanal baking meets the slow life. <br/> Your daily escape in the heart of the city.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a 
            href="#menu" 
            onClick={handleScrollToMenu}
            className="group relative px-10 py-5 bg-cream text-dark-brown rounded-full font-bold overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 text-lg">View Our Menu</span>
            <div className="absolute inset-0 bg-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>

      {/* Modern Organic Wave */}
      <div className="absolute bottom-0 left-0 w-full z-20 leading-[0]">
        <svg viewBox="0 0 1440 200" className="w-full h-auto block" preserveAspectRatio="none">
          <path
            fill="#F9F5F0"
            fillOpacity="1"
            d="M0,128L60,138.7C120,149,240,171,360,165.3C480,160,600,128,720,112C840,96,960,96,1080,112C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;