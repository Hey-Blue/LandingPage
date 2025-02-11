"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const images = useMemo(() => [
    "https://utfs.io/f/xPb29TA7HRGZinicnIQd4je25EJPgKfnwhZYvTxQUraDGLOR",
    "https://utfs.io/f/xPb29TA7HRGZVI7WuGfsm5HS2zldkwqNROvtFf86P1TME4YA",
    "https://utfs.io/f/xPb29TA7HRGZQTJUWV3fEJyDl4KCT95AqSx6wHbn1I2PW70m",
    "https://utfs.io/f/xPb29TA7HRGZfDo5ZRUXtyD8LoWCv1n7YE6ZM52gJQSbTaBc",
    "https://utfs.io/f/xPb29TA7HRGZ72ZS5e6nCSByX5IGqPrj4z2Ul0LYTkfmx1p6"
  ], []);

  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        const imageLoader = new window.Image();
        imageLoader.src = src;
        imageLoader.onload = () => {
          setLoadedImages(prev => new Set([...prev, src]));
        };
      });
    };

    preloadImages();
  }, [images]);

  useEffect(() => {
    if (loadedImages.size === images.length) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [loadedImages.size, images.length, currentImageIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Reset form data
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(result.error || 'Failed to submit form');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div className="pt-20">
          <div className="container max-w-7xl mx-auto px-4 py-24">
            <div className="space-y-12">
              <div className="text-center space-y-4 mb-12">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Contact Us
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Get in touch with our team
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] md:h-[600px]">
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <AnimatePresence initial={false} mode="wait">
                      {loadedImages.size === images.length && (
                        <motion.div 
                          key={currentImageIndex}
                          className="absolute inset-0"
                          initial={{ opacity: 0, x: 200 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -200 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          <Image
                            src={images[currentImageIndex]}
                            alt={`Slide ${currentImageIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={100}
                            priority
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                    {images.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          currentImageIndex === index 
                            ? 'bg-white w-6' 
                            : 'bg-white/50 w-2 hover:bg-white/70'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12"
                >
                  {submitted ? (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-center text-green-600 text-xl font-medium"
                    >
                      Thank you for your message! We&apos;ll get back to you soon.
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
                          {error}
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
  </div>
    
  );
};

export default ContactUsPage;