import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './Navigation';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export default function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-md py-4 px-6 md:px-12 flex items-center justify-between"
        >
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-12 h-12" />
            <span className="hidden md:block font-black text-sm tracking-widest text-zinc-900 uppercase">
              GALA REAL ESTATE
            </span>
          </Link>
          <div className="flex-1 flex justify-center">
            <Navigation dark={true} compact={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
