import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Award, Home as HomeIcon, Star, Users, MessageCircle, X, Search, DollarSign, Key, User } from 'lucide-react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Chat from './components/Chat';
import { Logo } from './components/Logo';
import Navigation from './components/Navigation';
import StickyHeader from './components/StickyHeader';
import { Message } from './types';
import Buyers from './pages/Buyers';
import Sellers from './pages/Sellers';

function HomePage() {
  const location = useLocation();

  React.useEffect(() => {
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

  return (
    <>
      {/* Header Section - Full Screen Hero with Tropical Sunset Background */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background Image - Tropical Sunset Luxury Villa */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Bright, vibrant overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        {/* Navigation Buttons - Top Left */}
        <div className="absolute top-10 left-10 z-20 max-w-[90vw]">
          <Navigation />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full px-4">
          <Logo className="w-[220px] h-[220px] mb-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]" />
          <div className="text-white text-lg sm:text-2xl md:text-3xl font-black tracking-[0.3em] uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,1)] whitespace-nowrap">
            GALA • REAL • ESTATE • GROUP
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-white font-bold drop-shadow-md">Explore</span>
          <div className="w-px h-20 bg-gradient-to-b from-red-600 to-transparent relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-zinc-400" />
          </div>
        </motion.div>
      </motion.header>

      {/* Thick Red Line Break */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className="h-10 w-full bg-red-600 origin-left shadow-[0_0_30px_rgba(220,38,38,0.4)] z-20" 
      />

      {/* Legacy Section - All White Background */}
      <section id="legacy-section" className="bg-white py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl sm:text-5xl mb-6 text-zinc-900 leading-tight">A Legacy of Excellence in Northern Virginia</h2>
            <div className="h-1.5 w-24 bg-red-600 mb-10 rounded-full mx-auto" />
            <div className="max-w-4xl mx-auto">
              <p className="text-zinc-600 text-xl leading-relaxed mb-8">
                Tushar Gala is a dedicated partner in your home-buying or selling journey, bringing over 15 years of experience to the Herndon market. Known for his integrity and deep local knowledge, Tushar has successfully guided over 500 families to their dream homes.
              </p>
              <p className="text-zinc-600 text-xl leading-relaxed">
                Whether you're looking for your first home, an investment property to grow your portfolio, or a luxury estate that reflects your lifestyle, Tushar provides the expert guidance and personalized service you deserve.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Triangle Background Pattern */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 scrolling-triangles pointer-events-none z-0" />
        <div className="max-w-5xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-7 space-y-10 relative"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="p-8 bg-white/80 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group backdrop-blur-sm"
                >
                  <Star className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-xl font-bold mb-3 text-zinc-900">Client-First Philosophy</h4>
                  <div className="h-0.5 w-10 bg-red-600 mb-4 rounded-full" />
                  <p className="text-sm text-zinc-600 leading-relaxed">Every decision is made with your best interests in mind, ensuring a smooth and stress-free transaction from start to finish.</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 }}
                  className="p-8 bg-white/80 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group backdrop-blur-sm"
                >
                  <Users className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-xl font-bold mb-3 text-zinc-900">Local Community Expert</h4>
                  <div className="h-0.5 w-10 bg-red-600 mb-4 rounded-full" />
                  <p className="text-sm text-zinc-600 leading-relaxed">From school districts to upcoming developments, Tushar knows Northern Virginia like the back of his hand.</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 }}
                  className="p-8 bg-white/80 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group backdrop-blur-sm"
                >
                  <Search className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-xl font-bold mb-3 text-zinc-900">Buying Homes</h4>
                  <div className="h-0.5 w-10 bg-red-600 mb-4 rounded-full" />
                  <p className="text-sm text-zinc-600 leading-relaxed">Finding the perfect property at the right price. Tushar guides you through every step of the home-buying process.</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 }}
                  className="p-8 bg-white/80 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group backdrop-blur-sm"
                >
                  <DollarSign className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-xl font-bold mb-3 text-zinc-900">Selling Homes</h4>
                  <div className="h-0.5 w-10 bg-red-600 mb-4 rounded-full" />
                  <p className="text-sm text-zinc-600 leading-relaxed">Strategic marketing and expert negotiation to ensure you get top dollar for your property in the shortest time.</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 }}
                  className="p-8 bg-white/80 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group sm:col-span-2 backdrop-blur-sm"
                >
                  <Key className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-xl font-bold mb-3 text-zinc-900">Renting & Leasing</h4>
                  <div className="h-0.5 w-10 bg-red-600 mb-4 rounded-full" />
                  <p className="text-sm text-zinc-600 leading-relaxed">Assisting landlords in finding quality tenants and helping renters find their ideal home in Northern Virginia.</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="bg-white/80 border border-zinc-200 shadow-sm rounded-3xl p-10 text-center backdrop-blur-sm">
                <div className="space-y-10">
                  <div>
                    <div className="text-5xl font-serif font-bold text-red-600 mb-2">15+</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold">Years of Experience</div>
                  </div>
                  <div className="h-px bg-zinc-200 w-1/2 mx-auto" />
                  <div>
                    <div className="text-5xl font-serif font-bold text-red-600 mb-2">$ 8,000,000+</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold">in Transactions</div>
                  </div>
                  <div className="h-px bg-zinc-200 w-1/2 mx-auto" />
                  <div>
                    <div className="text-5xl font-serif font-bold text-red-600 mb-2">4.9/5</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold">Average Client Rating</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/80 border border-zinc-200 shadow-sm hover:border-red-500/30 transition-colors backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600">
                    <Award size={24} />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700">Top Producer 2023 - Pearson Smith Realty</span>
                </div>
                <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/80 border border-zinc-200 shadow-sm hover:border-red-500/30 transition-colors backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600">
                    <HomeIcon size={24} />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700">Luxury Property Specialist</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section - White Background */}
      <section id="contact-section" className="bg-white py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl sm:text-5xl mb-6 text-zinc-900 leading-tight">Contact Details</h2>
              <div className="h-1.5 w-24 bg-red-600 mb-10 rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Profile Info */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative mb-8">
                  <div className="w-64 h-64 rounded-full border-4 border-red-600 p-2 overflow-hidden bg-zinc-100">
                    <img 
                      src="/tushar-gala.jpg"
                      alt="Tushar Gala"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-3 rounded-2xl shadow-lg">
                    <Award size={24} />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-zinc-900 mb-2">Tushar Gala</h3>
                <p className="text-red-600 font-bold uppercase tracking-widest text-sm">REALTOR®</p>
              </div>

              {/* Contact List */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <a href="tel:7133823247" className="flex items-center gap-6 p-6 rounded-2xl hover:bg-zinc-100/50 transition-all group border-b border-zinc-100 last:border-0">
                  <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 transition-colors shrink-0">
                    <Phone className="text-red-500 group-hover:text-white transition-colors" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">Phone</h4>
                    <p className="text-xl md:text-2xl font-bold text-zinc-900">713.382.3247</p>
                  </div>
                </a>

                <a href="tel:5713861075" className="flex items-center gap-6 p-6 rounded-2xl hover:bg-zinc-100/50 transition-all group border-b border-zinc-100 last:border-0">
                  <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 transition-colors shrink-0">
                    <Phone className="text-red-500 group-hover:text-white transition-colors" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">Secondary Phone</h4>
                    <p className="text-xl md:text-2xl font-bold text-zinc-900">571.386.1075</p>
                  </div>
                </a>
                
                <a href="mailto:tushar.gala@pearsonsmithrealty.com" className="flex items-center gap-6 p-6 rounded-2xl hover:bg-zinc-100/50 transition-all group border-b border-zinc-100 last:border-0">
                  <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 transition-colors shrink-0">
                    <Mail className="text-red-500 group-hover:text-white transition-colors" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">Email</h4>
                    <p className="text-xl md:text-2xl font-bold text-zinc-900 break-all">tushar.gala@pearsonsmithrealty.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 p-6 rounded-2xl hover:bg-zinc-100/50 transition-all group">
                  <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 transition-colors shrink-0">
                    <MapPin className="text-red-500 group-hover:text-white transition-colors" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">Location</h4>
                    <p className="text-xl md:text-2xl font-bold text-zinc-900">Pearson Smith Realty</p>
                    <p className="text-lg md:text-xl font-medium text-zinc-600">43777 Central Station Drive, Suite 390, Ashburn, VA 20147</p>
                  </div>
                </div>
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

      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl shadow-red-600/40 flex items-center justify-center hover:bg-red-500 hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
      </button>

      {/* Chat Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50"
            />
            
            {/* Chat Window */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-8 right-8 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl z-[60] overflow-hidden flex flex-col border border-zinc-200"
            >
              <div className="p-6 bg-white border-b border-zinc-200 text-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Tushar's Assistant</h3>
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
                  <X size={20} />
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
