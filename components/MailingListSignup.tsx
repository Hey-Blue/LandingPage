import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const MailingListSignup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [hasUserDismissed, setHasUserDismissed] = useState(true);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenMailingPopup');
    if (!hasSeenPopup) {
      setHasUserDismissed(false);
      const handleScroll = () => {
        if (window.scrollY > 300 && !hasSeenPopup) {
          setIsOpen(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    setHasUserDismissed(true);
    localStorage.setItem('hasSeenMailingPopup', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await addDoc(collection(db, "mailingList"), {
        email,
        timestamp: new Date(),
        source: 'website-popup'
      });
      
      setSubmitted(true);
      localStorage.setItem('hasSeenMailingPopup', 'true');
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setEmail('');
      }, 3000);
    } catch (err) {
      console.error('Error saving email:', err);
      setError('Failed to subscribe. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && !hasUserDismissed && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black z-40"
            onClick={handleDismiss}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto z-50"
          >
            <div className="bg-gradient-to-br from-white to-blue-50 p-6 md:p-8 shadow-2xl w-full md:w-[420px] md:rounded-3xl border border-blue-100/50">
              <button 
                onClick={handleDismiss}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full 
                  bg-white/80 backdrop-blur text-gray-600 hover:bg-gray-100 
                  transition-all duration-200 shadow-sm"
                aria-label="Close popup"
              >
                ✕
              </button>
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 
                      bg-clip-text text-transparent tracking-tight mb-2">
                      Stay Updated with Hey, Blue!
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Join our mailing list for community updates and news.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3.5 border border-blue-100 rounded-xl text-base
                          bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 
                          focus:border-transparent transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 
                        hover:from-blue-700 hover:to-blue-600 text-white rounded-xl 
                        px-6 py-3.5 text-base font-semibold shadow-lg 
                        hover:shadow-blue-500/25 transition-all duration-200"
                    >
                      Subscribe Now
                    </motion.button>
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-red-500 text-sm mt-2"
                      >
                        {error}
                      </motion.p>
                    )}
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    You&apos;ve successfully joined our mailing list.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};