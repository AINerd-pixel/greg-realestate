import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './Navigation';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export default function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setIsScrolled(scrollTop > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar — always visible */}
      <div className="fixed top-0 left-0 right-0 z-[110] h-[2px] bg-zinc-100 pointer-events-none">
        <div
          className="h-full bg-red-600 transition-all duration-75 ease-linear"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Nav */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 2, opacity: 1 }}
            exit={{ y: -70, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-[0_2px_20px_rgba(0,0,0,0.05)] py-3 px-5 md:px-10 flex items-center justify-between"
          >
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <motion.div whileHover={{ rotate: 6 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Logo className="w-10 h-10" />
              </motion.div>
              <span className="hidden md:block font-black text-xs tracking-[0.2em] text-zinc-900 uppercase">
                Gala Real Estate
              </span>
            </Link>
            <div className="flex-1 flex justify-end sm:justify-center">
              <Navigation dark={true} compact={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
