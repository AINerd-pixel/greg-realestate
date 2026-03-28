import { useEffect } from 'react';
import { motion } from 'motion/react';
import { DollarSign, BarChart3, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const cards = [
  {
    icon: BarChart3,
    title: 'Market Analysis',
    desc: 'Comprehensive valuation based on current market trends and local Northern Virginia neighborhood data.',
  },
  {
    icon: Camera,
    title: 'Premium Staging',
    desc: 'Professional photography and staging advice to make your home irresistible and stand out to buyers.',
  },
  {
    icon: DollarSign,
    title: 'Expert Negotiation',
    desc: 'Aggressive, strategic representation to ensure you get the highest possible price for your property.',
  },
];

export default function Sellers() {
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
          <h1 className="font-serif text-5xl sm:text-6xl mb-6 text-zinc-900">Sell Your Property</h1>
          <div className="h-[2px] w-20 bg-red-600 mb-8 rounded-full mx-auto" />
          <p className="text-zinc-500 text-xl max-w-3xl mx-auto leading-relaxed">
            Maximize your return with strategic marketing and expert negotiation. Tushar Gala's proven track record
            ensures your property stands out and sells for top dollar.
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
          className="bg-zinc-900 rounded-[2.5rem] p-10 sm:p-14 text-white text-center mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">What's your home worth?</h2>
          <p className="mb-8 text-zinc-400 text-lg max-w-md mx-auto">
            Get a free, no-obligation market valuation of your property today.
          </p>
          <Link
            to="/#contact-section"
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 hover:bg-red-500 active:scale-95 transition-all shadow-lg"
          >
            Get My Free Valuation
          </Link>
        </motion.section>
      </main>
    </div>
  );
}
