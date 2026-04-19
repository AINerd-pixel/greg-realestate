import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'lead_form_dismissed';

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isValidPhone = (v: string) => /^\+?[\d\s\-().]{7,}$/.test(v) && v.replace(/\D/g, '').length >= 7;

export default function LeadFormPopup() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', interest: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (location.pathname === '/open-house') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const delay = parseInt(process.env.POPUP_DELAY_MS ?? '10000', 10);
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [location.pathname]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!isValidPhone(form.phone)) {
      errs.phone = 'Enter a valid phone number.';
    }
    if (form.email && !isValidEmail(form.email)) {
      errs.email = 'Enter a valid email address.';
    }
    if (!form.interest) errs.interest = 'Please select your interest.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, origin: 'Website' }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(STORAGE_KEY, '1');
      }, 2500);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all bg-zinc-50 ${
      errors[field]
        ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500'
        : 'border-zinc-200 focus:ring-red-500/20 focus:border-red-500'
    }`;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/50 backdrop-blur-sm z-[150]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] sm:w-[480px] z-[160] bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="h-1.5 w-full bg-red-600" />

            <div className="p-7 sm:p-8">

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-4">
                      <CheckCircle className="text-red-600" size={32} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">Thank You!</h3>
                    <p className="text-zinc-500 text-sm">Tushar will be in touch with you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-red-600 mb-1">Get In Touch</h2>
                    <p className="text-zinc-500 text-sm mb-6">Leave your details and Tushar will reach out to you personally.</p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" className={inputClass('name')} />
                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                      </div>
                      <div>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Contact Number *" className={inputClass('phone')} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" type="email" className={inputClass('email')} />
                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                      </div>
                      <div>
                        <input name="address" value={form.address} onChange={handleChange} placeholder="Your Address" className={inputClass('address')} />
                      </div>
                      <div>
                        <select name="interest" value={form.interest} onChange={handleChange} className={`${inputClass('interest')} ${!form.interest ? 'text-zinc-400' : 'text-zinc-900'}`}>
                          <option value="" disabled>I'm interested in... *</option>
                          <option value="Buying">Buying a Home</option>
                          <option value="Selling">Selling a Home</option>
                          <option value="Investing">Investing in Property</option>
                          <option value="Renting">Renting / Leasing</option>
                        </select>
                        {errors.interest && <p className="text-red-500 text-xs mt-1 ml-1">{errors.interest}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                      >
                        {loading ? 'Submitting...' : 'Get a Free Consultation'}
                      </button>
                    </form>

                    <p className="text-center text-[10px] text-zinc-400 mt-4">
                      Your information is kept private and never shared.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
