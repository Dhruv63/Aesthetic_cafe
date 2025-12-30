import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Vibe', href: '#space' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <nav className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            flex items-center justify-between px-6 py-3 rounded-full 
            transition-all duration-300 backdrop-blur-md border
            ${scrolled 
              ? 'bg-dark-brown/90 border-white/10 shadow-2xl w-full max-w-4xl' 
              : 'bg-white/10 border-white/20 w-full max-w-6xl'
            }
          `}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white font-serif font-bold text-lg">
              C
            </div>
            <span className={`font-serif text-xl font-bold tracking-tight ${scrolled ? 'text-cream' : 'text-white'}`}>
              Cocoa
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  scrolled ? 'text-cream/80 hover:text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-terracotta transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#menu"
              className={`hidden md:block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                scrolled
                  ? 'bg-terracotta text-white hover:bg-white hover:text-dark-brown'
                  : 'bg-white text-dark-brown hover:bg-terracotta hover:text-white'
              }`}
            >
              Order Online
            </a>
            
            <button
              className={`md:hidden p-2 ${scrolled ? 'text-white' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-dark-brown flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-serif text-cream hover:text-terracotta transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;