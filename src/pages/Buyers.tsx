import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, CheckCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const cards = [
  {
    icon: Search,
    title: 'Property Search',
    desc: 'Access to exclusive listings and off-market opportunities tailored to your specific needs and budget.',
  },
  {
    icon: CheckCircle,
    title: 'Due Diligence',
    desc: 'Thorough inspections and neighborhood analysis to ensure you\'re making a sound, well-informed investment.',
  },
  {
    icon: ShoppingCart,
    title: 'Closing Support',
    desc: 'Expert negotiation and coordination with lenders and title companies for a seamless, stress-free close.',
  },
];

export default function Buyers() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-red-500/30">

      <nav className="p-6 border-b border-zinc-100">
        <Navigation />
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="font-serif text-5xl sm:text-6xl mb-6 text-zinc-900">Buyer's Guide</h1>
          <div className="h-[2px] w-20 bg-red-600 mb-8 rounded-full mx-auto" />
          <p className="text-zinc-500 text-xl max-w-3xl mx-auto leading-relaxed">
            Finding your dream home in Northern Virginia requires strategy, local insight, and expert negotiation.
            Tushar Gala is here to guide you through every step of the journey.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {cards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.07)' }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors duration-300">
                <item.icon className="text-red-600 group-hover:text-white transition-colors duration-300" size={22} />
              </div>
              <h3 className="text-base font-bold mb-2 text-zinc-900">{item.title}</h3>
              <div className="h-[1.5px] w-8 bg-red-600 mb-3 rounded-full group-hover:w-12 transition-all duration-300" />
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-red-600 rounded-[2.5rem] p-10 sm:p-14 text-white text-center mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Ready to find your home?</h2>
          <p className="mb-8 text-red-100 text-lg max-w-md mx-auto">
            Let's start your journey with a personalized consultation from Tushar.
          </p>
          <Link
            to="/#contact-section"
            className="inline-block bg-white text-red-600 px-10 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg"
          >
            Schedule a Meeting
          </Link>
        </motion.section>
      </main>
    </div>
  );
}
