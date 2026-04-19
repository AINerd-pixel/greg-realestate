import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, Facebook } from 'lucide-react';

const CONTACT = {
  phone: 'tel:+17133823247',
  email: 'mailto:tushar.gala@pearsonsmithrealty.com',
  facebook: 'https://www.facebook.com/profile.php?id=100090476906978',
};

function SocialIcons({ isDark, size = 17 }: { isDark: boolean; size?: number }) {
  const iconClass = `transition-colors hover:text-red-600 ${isDark ? 'text-zinc-500' : 'text-white/70 hover:text-white'}`;
  const divider = <span className={`select-none font-black ${isDark ? 'text-zinc-300' : 'text-white/30'}`}>|</span>;
  return (
    <div className="flex items-center gap-2 ml-2">
      <a href={CONTACT.phone} aria-label="Call Tushar" className={iconClass}><Phone size={size} strokeWidth={2.5} /></a>
      {divider}
      <a href={CONTACT.email} aria-label="Email Tushar" className={iconClass}><Mail size={size} strokeWidth={2.5} /></a>
      {divider}
      <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={iconClass}><Facebook size={size} strokeWidth={2.5} /></a>
    </div>
  );
}

export default function Navigation({ dark = false, compact = false }: { dark?: boolean, compact?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = (id: string) => {
    setMobileOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  const isDark = dark || !isHome;
  const textColor = isDark ? 'text-zinc-900' : 'text-white';
  const baseStyle = `font-bold cursor-pointer ${compact ? 'text-xs sm:text-sm' : 'text-[18px]'} uppercase tracking-[0.25em] transition-all hover:underline underline-offset-8 ${isDark ? 'text-zinc-900' : 'text-white'}`;
  const activeStyle = "underline underline-offset-8 decoration-red-600 decoration-2";

  return (
    <>
      {/* Desktop nav */}
      <div className={`hidden sm:flex items-center ${compact ? 'gap-3 sm:gap-6' : 'gap-4 sm:gap-8 md:gap-12'} flex-wrap ${!compact && !isHome ? 'w-full justify-center' : ''}`}>
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${baseStyle} ${location.pathname === '/' ? activeStyle : ''}`}>Home</Link>
        <button onClick={() => handleScroll('legacy-section')} className={baseStyle}>About</button>
        <button onClick={() => handleScroll('contact-section')} className={baseStyle}>Contact</button>
        <button onClick={() => { navigate('/buyers'); window.scrollTo(0, 0); }} className={baseStyle}>Buyers</button>
        <button onClick={() => { navigate('/sellers'); window.scrollTo(0, 0); }} className={baseStyle}>Sellers</button>
        <SocialIcons isDark={isDark} size={compact ? 15 : 17} />
      </div>

      {/* Mobile hamburger */}
      <div className="sm:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)} className={`p-2 ${textColor}`} aria-label="Toggle menu">
          <Menu size={28} />
        </button>

        {mobileOpen && createPortal(
          <div className="fixed inset-0 z-[200] bg-zinc-950/97 backdrop-blur-md flex flex-col items-center justify-center gap-10">
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-white p-2" aria-label="Close menu">
              <X size={32} />
            </button>
            <Link to="/" onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`text-white text-2xl font-bold uppercase tracking-widest ${location.pathname === '/' ? 'underline decoration-red-600 underline-offset-8' : ''}`}>Home</Link>
            <button onClick={() => handleScroll('legacy-section')} className="text-white text-2xl font-bold uppercase tracking-widest">About</button>
            <button onClick={() => handleScroll('contact-section')} className="text-white text-2xl font-bold uppercase tracking-widest">Contact</button>
            <button onClick={() => { setMobileOpen(false); navigate('/buyers'); window.scrollTo(0, 0); }} className="text-white text-2xl font-bold uppercase tracking-widest">Buyers</button>
            <button onClick={() => { setMobileOpen(false); navigate('/sellers'); window.scrollTo(0, 0); }} className="text-white text-2xl font-bold uppercase tracking-widest">Sellers</button>
            <div className="flex items-center gap-4 mt-2">
              <a href={CONTACT.phone} aria-label="Call Tushar" className="text-white/70 hover:text-red-400 transition-colors"><Phone size={24} strokeWidth={2.5} /></a>
              <span className="text-white/30 font-black">|</span>
              <a href={CONTACT.email} aria-label="Email Tushar" className="text-white/70 hover:text-red-400 transition-colors"><Mail size={24} strokeWidth={2.5} /></a>
              <span className="text-white/30 font-black">|</span>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/70 hover:text-red-400 transition-colors"><Facebook size={24} strokeWidth={2.5} /></a>
            </div>
          </div>,
          document.body
        )}
      </div>
    </>
  );
}
