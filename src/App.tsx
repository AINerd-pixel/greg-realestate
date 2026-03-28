import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { MapPin, Phone, Mail, Award, Home as HomeIcon, Star, Users, MessageCircle, X, Search, DollarSign, Key } from 'lucide-react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Chat from './components/Chat';
import { Logo } from './components/Logo';
import Navigation from './components/Navigation';
import StickyHeader from './components/StickyHeader';
import { Message } from './types';
import Buyers from './pages/Buyers';
import Sellers from './pages/Sellers';

function StatCounter({ end, prefix = '', suffix = '', decimals = 0 }: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * end).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, decimals]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-serif font-bold text-red-600 mb-2">
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}
    </div>
  );
}

function HomePage() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, -100]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const featureCards = [
    { icon: Star, title: 'Client-First Philosophy', desc: 'Every decision is made with your best interests in mind, ensuring a smooth and stress-free transaction from start to finish.' },
    { icon: Users, title: 'Local Community Expert', desc: 'From school districts to upcoming developments, Tushar knows Northern Virginia like the back of his hand.' },
    { icon: Search, title: 'Buying Homes', desc: 'Finding the perfect property at the right price. Tushar guides you through every step of the home-buying process.' },
    { icon: DollarSign, title: 'Selling Homes', desc: 'Strategic marketing and expert negotiation to ensure you get top dollar for your property in the shortest time.' },
  ];

  const contactItems = [
    { href: 'tel:7033823247', icon: Phone, label: 'Phone', value: '703.382.3247' },
    { href: 'tel:5713861075', icon: Phone, label: 'Secondary Phone', value: '571.386.1075' },
    { href: 'mailto:tushar.gala@pearsonsmithrealty.com', icon: Mail, label: 'Email', value: 'tushar.gala@pearsonsmithrealty.com' },
  ];

  return (
    <>
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          className="absolute z-0"
          style={{ top: '-15%', left: 0, right: 0, bottom: '-15%', y: bgY }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" />
        </motion.div>

        {/* Navigation */}
        <div className="absolute top-6 left-5 sm:top-10 sm:left-10 z-20">
          <Navigation />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center w-full px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo className="w-[130px] h-[130px] sm:w-[200px] sm:h-[200px] mb-6 sm:mb-8 drop-shadow-[0_20px_60px_rgba(0,0,0,0.7)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-sm sm:text-xl md:text-2xl font-black tracking-[0.18em] sm:tracking-[0.3em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] text-center"
          >
            GALA • REAL • ESTATE • GROUP
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-5 h-[1.5px] w-20 bg-red-600"
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-4 text-white/60 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-medium"
          >
            Northern Virginia · Since 2009
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[9px] uppercase tracking-[0.6em] text-white/50 font-bold">Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-red-600 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-red-400 to-transparent"
            />
          </div>
        </motion.div>
      </motion.header>

      {/* Red Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'circOut' }}
        className="h-10 w-full bg-red-600 origin-left shadow-[0_0_30px_rgba(220,38,38,0.4)] z-20"
      />

      {/* About Section */}
      <section id="legacy-section" className="bg-white py-28 sm:py-36 relative z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-red-600 text-[10px] sm:text-xs tracking-[0.45em] uppercase font-bold mb-4">About Tushar</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6 text-zinc-900 leading-tight">
              A Legacy of Excellence<br className="hidden sm:block" /> in Northern Virginia
            </h2>
            <div className="h-[2px] w-20 bg-red-600 mb-10 rounded-full mx-auto" />
            <div className="max-w-3xl mx-auto space-y-5">
              <p className="text-zinc-500 text-lg sm:text-xl leading-relaxed">
                Tushar Gala is a dedicated partner in your home-buying or selling journey, bringing over 15 years of experience to the Herndon market. Known for his integrity and deep local knowledge, Tushar has successfully guided over 500 families to their dream homes.
              </p>
              <p className="text-zinc-500 text-lg sm:text-xl leading-relaxed">
                Whether you're looking for your first home, an investment property to grow your portfolio, or a luxury estate that reflects your lifestyle, Tushar provides the expert guidance and personalized service you deserve.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 scrolling-triangles pointer-events-none z-0" />
        <div className="max-w-5xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* Cards */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featureCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.08)' }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    className="p-7 bg-white rounded-3xl border border-zinc-200 shadow-sm group cursor-default"
                  >
                    <card.icon className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300" size={28} />
                    <h4 className="text-base font-bold mb-2 text-zinc-900">{card.title}</h4>
                    <div className="h-[1.5px] w-8 bg-red-600 mb-3 rounded-full group-hover:w-14 transition-all duration-300" />
                    <p className="text-sm text-zinc-500 leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.08)' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.32, duration: 0.6 }}
                  className="p-7 bg-white rounded-3xl border border-zinc-200 shadow-sm group cursor-default sm:col-span-2"
                >
                  <Key className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300" size={28} />
                  <h4 className="text-base font-bold mb-2 text-zinc-900">Renting & Leasing</h4>
                  <div className="h-[1.5px] w-8 bg-red-600 mb-3 rounded-full group-hover:w-14 transition-all duration-300" />
                  <p className="text-sm text-zinc-500 leading-relaxed">Assisting landlords in finding quality tenants and helping renters find their ideal home in Northern Virginia.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 space-y-5"
            >
              <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-10 text-center">
                <div className="space-y-7">
                  <div>
                    <StatCounter end={15} suffix="+" />
                    <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 font-bold">Years of Experience</div>
                  </div>
                  <div className="h-px bg-zinc-100 w-2/3 mx-auto" />
                  <div>
                    <StatCounter end={8} prefix="$" suffix="M+" />
                    <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 font-bold">in Transactions</div>
                  </div>
                  <div className="h-px bg-zinc-100 w-2/3 mx-auto" />
                  <div>
                    <StatCounter end={4.9} suffix="/5" decimals={1} />
                    <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 font-bold">Average Client Rating</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Award, text: 'Top Producer 2023 — Pearson Smith Realty' },
                  { icon: HomeIcon, text: 'Luxury Property Specialist' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-red-500/30 hover:shadow-md transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600 shrink-0">
                      <item.icon size={20} />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="bg-white py-28 sm:py-36 relative z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <p className="text-red-600 text-[10px] sm:text-xs tracking-[0.45em] uppercase font-bold mb-4">Get In Touch</p>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6 text-zinc-900 leading-tight">Contact Details</h2>
              <div className="h-[2px] w-20 bg-red-600 rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Profile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className="relative mb-7">
                  <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border-4 border-red-600 p-2 overflow-hidden bg-zinc-100">
                    <img
                      src="/tushar-gala.jpg"
                      alt="Tushar Gala"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-3 rounded-2xl shadow-lg">
                    <Award size={22} />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-1">Tushar Gala</h3>
                <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-4">REALTOR®</p>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                  Serving Herndon, Northern Virginia, and Leesburg with integrity, deep expertise, and a client-first approach.
                </p>
              </motion.div>

              {/* Contact Items */}
              <div className="lg:col-span-7 flex flex-col">
                {contactItems.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-center gap-5 p-5 sm:p-6 rounded-2xl hover:bg-zinc-50 transition-all group border border-transparent hover:border-zinc-100"
                  >
                    <div className="w-13 h-13 w-14 h-14 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 transition-colors shrink-0">
                      <item.icon className="text-red-500 group-hover:text-white transition-colors" size={22} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400 mb-1">{item.label}</h4>
                      <p className="text-lg sm:text-xl font-bold text-zinc-900 break-all">{item.value}</p>
                    </div>
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.36 }}
                  className="flex items-center gap-5 p-5 sm:p-6 rounded-2xl hover:bg-zinc-50 transition-all group border border-transparent hover:border-zinc-100"
                >
                  <div className="w-14 h-14 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 transition-colors shrink-0">
                    <MapPin className="text-red-500 group-hover:text-white transition-colors" size={22} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400 mb-1">Location</h4>
                    <p className="text-lg sm:text-xl font-bold text-zinc-900">Pearson Smith Realty</p>
                    <p className="text-sm text-zinc-500 mt-0.5">43777 Central Station Drive, Suite 390, Ashburn, VA 20147</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm Tushar Gala's assistant. How can I help you with your real estate needs today?" }
  ]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-red-500/30 relative overflow-x-hidden">
      <StickyHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buyers" element={<Buyers />} />
        <Route path="/sellers" element={<Sellers />} />
      </Routes>

      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-7 right-5 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-red-600 text-white rounded-full shadow-2xl shadow-red-600/40 flex items-center justify-center hover:bg-red-500 hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-400 border-2 border-white rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed bottom-0 right-0 left-0 sm:bottom-8 sm:right-8 sm:left-auto w-full sm:w-[400px] h-[85vh] sm:h-[600px] sm:max-h-[80vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-[60] overflow-hidden flex flex-col border border-zinc-100"
            >
              <div className="p-5 bg-white border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
                    <Users size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900">Tushar's Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                <Chat
                  messages={chatMessages}
                  setMessages={setChatMessages}
                  onReset={() => setChatMessages([{ role: 'model', text: "Hello! I'm Tushar Gala's assistant. How can I help you with your real estate needs today?" }])}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
