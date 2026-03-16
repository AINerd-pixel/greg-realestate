import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navigation({ dark = false, compact = false }: { dark?: boolean, compact?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleScroll = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  const isDark = dark || !isHome;
  const baseStyle = `font-bold cursor-pointer ${compact ? 'text-xs sm:text-sm' : 'text-[18px]'} uppercase tracking-[0.25em] transition-all hover:underline underline-offset-8 ${isDark ? 'text-zinc-900' : 'text-white'}`;
  const activeStyle = "underline underline-offset-8 decoration-red-600 decoration-2";

  return (
    <div className={`flex items-center ${compact ? 'gap-3 sm:gap-6' : 'gap-4 sm:gap-8 md:gap-12'} flex-wrap ${isHome ? '' : 'w-full justify-center md:justify-start'}`}>
      <Link 
        to="/"
        className={`${baseStyle} ${location.pathname === '/' ? activeStyle : ''}`}
      >
        Home
      </Link>
      <button 
        onClick={() => handleScroll('legacy-section')}
        className={baseStyle}
      >
        About
      </button>
      <button 
        onClick={() => handleScroll('contact-section')}
        className={baseStyle}
      >
        Contact
      </button>
      <Link 
        to="/buyers"
        className={`${baseStyle} ${location.pathname === '/buyers' ? activeStyle : ''}`}
      >
        Buyers
      </Link>
      <Link 
        to="/sellers"
        className={`${baseStyle} ${location.pathname === '/sellers' ? activeStyle : ''}`}
      >
        Sellers
      </Link>
    </div>
  );
}
