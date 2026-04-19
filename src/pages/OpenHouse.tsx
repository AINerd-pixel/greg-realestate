import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Logo } from '../components/Logo';
import SEO from '../components/SEO';

const RATINGS = ['Excellent', 'Good', 'Fair', 'Poor'] as const;
const CRITERIA = ['Price', 'Location', 'Floor Plan', 'Kitchen', 'Curb Appeal', 'Overall Opinion'] as const;
const INTENTS = ['Just browsing', 'Looking to buy now', 'Plan to buy within a year', 'Interested in selling'] as const;

type Rating = typeof RATINGS[number] | '';

interface FormState {
  name: string;
  phone: string;
  email: string;
  intents: string[];
  ratings: Record<string, Rating>;
  heardFrom: string;
  likedMost: string;
  likedLeast: string;
  additionalComments: string;
  workingWithAgent: string;
  sendOptions: string;
  notes: string;
}

const initial: FormState = {
  name: '', phone: '', email: '',
  intents: [],
  ratings: Object.fromEntries(CRITERIA.map(c => [c, ''])),
  heardFrom: '', likedMost: '', likedLeast: '', additionalComments: '',
  workingWithAgent: '', sendOptions: '', notes: '',
};

export default function OpenHouse() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    const formatted = digits.length <= 3 ? digits
      : digits.length <= 6 ? `${digits.slice(0, 3)}-${digits.slice(3)}`
      : `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    setField('phone', formatted);
  };

  const validateField = (key: 'phone' | 'email', value: string) => {
    if (key === 'phone') {
      if (!value.trim()) { setErrors(prev => ({ ...prev, phone: 'Phone is required.' })); return; }
      if (value.replace(/\D/g, '').length < 10) setErrors(prev => ({ ...prev, phone: 'Enter a valid 10-digit phone number.' }));
    }
    if (key === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setErrors(prev => ({ ...prev, email: 'Enter a valid email address.' }));
    }
  };

  const toggleIntent = (intent: string) => {
    setForm(prev => ({
      ...prev,
      intents: prev.intents.includes(intent)
        ? prev.intents.filter(i => i !== intent)
        : [...prev.intents, intent],
    }));
  };

  const setRating = (criterion: string, rating: Rating) => {
    setForm(prev => ({ ...prev, ratings: { ...prev.ratings, [criterion]: rating } }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.phone.trim()) errs.phone = 'Phone is required.';
    else if (form.phone.replace(/\D/g, '').length < 7) errs.phone = 'Enter a valid phone number.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) errs.email = 'Enter a valid email.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          intents: form.intents.join(', '),
          ...Object.fromEntries(Object.entries(form.ratings).map(([k, v]) => [k, v || ''])),
          heardFrom: form.heardFrom, likedMost: form.likedMost, likedLeast: form.likedLeast,
          additionalComments: form.additionalComments, workingWithAgent: form.workingWithAgent,
          sendOptions: form.sendOptions, notes: form.notes,
        }),
      });
      setSubmitted(true);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field?: string) =>
    `w-full border-b ${field && errors[field] ? 'border-red-400' : 'border-zinc-300'} bg-transparent py-1.5 text-sm text-zinc-800 placeholder-transparent focus:outline-none focus:border-zinc-800 transition-colors`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center">
          <CheckCircle className="text-red-600" size={32} />
        </div>
        <h2 className="font-serif text-3xl font-bold text-zinc-900">Thank You!</h2>
        <p className="text-zinc-500 text-sm max-w-xs">Your feedback has been submitted. Tushar appreciates you taking the time!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO title="Open House Feedback" description="Share your feedback on Tushar Gala's open house in Northern Virginia." canonical="/open-house" />
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light text-zinc-900 leading-none">Open House</h1>
            <p className="font-serif text-4xl italic text-zinc-900 leading-none mt-1">Feedback</p>
          </div>
          <Logo className="w-14 h-14 opacity-80" />
        </div>

        <div className="h-px bg-zinc-200 mb-8" />

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Contact + Intent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Contact fields */}
            <div className="space-y-5">
              {(['name', 'phone', 'email'] as const).map(f => (
                <div key={f}>
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">
                    {f === 'name' ? 'Name' : f === 'phone' ? 'Phone #' : 'Email'}{f !== 'email' ? ' *' : ''}
                  </label>
                  <input
                    value={form[f]}
                    onChange={e => f === 'phone' ? handlePhoneChange(e.target.value) : setField(f, e.target.value)}
                    onBlur={f !== 'name' ? e => validateField(f, e.target.value) : undefined}
                    className={inputClass(f)}
                    placeholder={f === 'phone' ? '555-555-5555' : f}
                    inputMode={f === 'phone' ? 'numeric' : undefined}
                  />
                  {errors[f] && <p className="text-red-500 text-xs mt-1">{errors[f]}</p>}
                </div>
              ))}
            </div>

            {/* Intent checkboxes */}
            <div className="space-y-3 pt-1">
              {INTENTS.map(intent => (
                <label key={intent} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => toggleIntent(intent)}
                    className={`w-4 h-4 border-2 flex-shrink-0 transition-colors cursor-pointer ${
                      form.intents.includes(intent) ? 'bg-red-600 border-red-600' : 'border-zinc-400 group-hover:border-zinc-600'
                    }`}
                  />
                  <span className="text-sm text-zinc-700">{intent}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-100" />

          {/* Rating table */}
          <div>
            <p className="text-sm text-zinc-600 mb-4">How would you rate the following:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left pb-3 w-40" />
                    {RATINGS.map(r => (
                      <th key={r} className="text-center pb-3 text-xs uppercase tracking-widest text-zinc-500 font-semibold px-2">{r}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {CRITERIA.map(criterion => (
                    <tr key={criterion}>
                      <td className="py-3 text-xs uppercase tracking-wider text-zinc-700 font-medium pr-4">{criterion}</td>
                      {RATINGS.map(rating => (
                        <td key={rating} className="py-3 text-center px-2">
                          <button
                            type="button"
                            onClick={() => setRating(criterion, rating)}
                            className={`w-5 h-5 border-2 mx-auto block transition-colors ${
                              form.ratings[criterion] === rating
                                ? 'bg-red-600 border-red-600'
                                : 'border-zinc-400 hover:border-zinc-600'
                            }`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="h-px bg-zinc-100" />

          {/* Open-ended questions */}
          {([
            ['heardFrom', 'How did you hear about the open house?'],
            ['likedMost', 'What did you like most about this house?'],
            ['likedLeast', 'What did you like least about this house?'],
            ['additionalComments', 'Is there anything else you would like to add?'],
          ] as const).map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm text-zinc-600 mb-2">{label}</label>
              <input
                value={form[field]}
                onChange={e => setField(field, e.target.value)}
                className="w-full border-b border-zinc-300 bg-transparent py-1.5 text-sm text-zinc-800 focus:outline-none focus:border-zinc-800 transition-colors"
                placeholder=" "
              />
            </div>
          ))}

          <div className="h-px bg-zinc-100" />

          {/* Yes/No questions */}
          <div className="space-y-4">
            {([
              ['workingWithAgent', 'Are you currently working with a real estate agent?'],
              ['sendOptions', 'If not, would you like me to send you other options?'],
            ] as const).map(([field, label]) => (
              <div key={field} className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-zinc-600 flex-1">{label}</span>
                <div className="flex items-center gap-4">
                  {['Yes', 'No'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => setField(field, opt)}
                        className={`w-4 h-4 border-2 flex-shrink-0 cursor-pointer transition-colors ${
                          form[field] === opt ? 'bg-red-600 border-red-600' : 'border-zinc-400 hover:border-zinc-600'
                        }`}
                      />
                      <span className="text-sm text-zinc-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Notes</label>
            <input
              value={form.notes}
              onChange={e => setField('notes', e.target.value)}
              className="w-full border-b border-zinc-300 bg-transparent py-1.5 text-sm text-zinc-800 focus:outline-none focus:border-zinc-800 transition-colors"
              placeholder=" "
            />
          </div>

          <div className="h-px bg-zinc-200" />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-red-600 text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-red-500 active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>

          <p className="text-center font-serif text-lg text-zinc-500 italic">
            Thank you for sharing your feedback!
          </p>
        </form>
      </div>
    </div>
  );
}
