import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, CheckCircle, Search, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Buyers() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-red-500/30">
      <nav className="p-6 border-b border-zinc-100">
        <Navigation />
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl sm:text-6xl mb-6 text-zinc-900">Buyer's Guide</h1>
          <div className="h-1.5 w-24 bg-red-600 mb-10 rounded-full mx-auto" />
          <p className="text-zinc-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Finding your dream home in Northern Virginia requires strategy, local insight, and expert negotiation. Tushar Gala is here to guide you through every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Search,
              title: "Property Search",
              desc: "Access to exclusive listings and off-market opportunities tailored to your specific needs."
            },
            {
              icon: CheckCircle,
              title: "Due Diligence",
              desc: "Thorough inspections and neighborhood analysis to ensure you're making a sound investment."
            },
            {
              icon: ShoppingCart,
              title: "Closing Support",
              desc: "Expert negotiation and coordination with lenders and title companies for a smooth finish."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200"
            >
              <item.icon className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <section className="bg-red-600 rounded-[3rem] p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to find your home?</h2>
          <p className="mb-8 opacity-90 text-lg">Let's start your journey today with a personalized consultation.</p>
          <Link to="/#contact-section" className="inline-block bg-white text-red-600 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
            Schedule a Meeting
          </Link>
        </section>
      </main>
    </div>
  );
}
