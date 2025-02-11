"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

const PlatformSwitch = ({ platform, onChange }: { platform: 'ios' | 'android', onChange: (platform: 'ios' | 'android') => void }) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-sm p-1 rounded-2xl inline-flex">
      {/* Animated Sliding Background */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1/2 bg-white rounded-2xl shadow-lg"
        layout
        initial={false}
        animate={{
          x: platform === 'ios' ? '-5%' : '90%',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ transform: platform === 'ios' ? 'translateX(-10%)' : 'translateX(110%)' }}
      />

      {/* iOS Button */}
      <button
        onClick={() => onChange('ios')}
        className={`relative px-6 py-3 rounded-xl transition-all z-10 ${
          platform === 'ios' ? 'text-blue-600' : 'text-white'
        }`}
      >
        iOS
      </button>

      {/* Android Button */}
      <button
        onClick={() => onChange('android')}
        className={`relative px-6 py-3 rounded-xl transition-all z-10 ${
          platform === 'android' ? 'text-blue-600' : 'text-white'
        }`}
      >
        Android
      </button>
    </div>
  );
};

const AppShowcase = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    }
  }, []);

  const images = [
    "https://utfs.io/f/xPb29TA7HRGZLpmmVLZ91EfDaAt2gSTH7JwOeo3kGbWIzCsL",
    "https://utfs.io/f/xPb29TA7HRGZiHOdBeQd4je25EJPgKfnwhZYvTxQUraDGLOR",
    "https://utfs.io/f/xPb29TA7HRGZf4NyrEUXtyD8LoWCv1n7YE6ZM52gJQSbTaBc",
    "https://utfs.io/f/xPb29TA7HRGZ0fspMtGc4LcsUoAvymTPG8wR2lVhjkZp5BQD",
  ];

  const storeLinks = {
    ios: 'https://apps.apple.com/us/app/hey-blue/id6499293126',
    android: 'https://play.google.com/store/apps/details?id=com.development.heyblue'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
  <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - App Info */}
          <div className="space-y-8 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
                Hey, Blue!
              </h1>
              <p className="text-xl text-white/90 text-center">
                Building stronger connections between law enforcement and communities.
              </p>

              {/* Platform Toggle */}
              <div className="flex justify-center">
                <PlatformSwitch 
                  platform={platform} 
                  onChange={setPlatform} 
                />
              </div>

              {/* Download Button */}
              <div className="flex justify-center">
                <Button
                  onClick={() => window.open(storeLinks[platform], '_blank')}
                  className="bg-white text-blue-600 hover:bg-white/90 px-8 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  {platform === 'ios' ? 'Download on App Store' : 'Get it on Google Play'}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image Slider */}
          <div className="relative w-full max-w-[400px] h-[800px] mx-auto lg:mx-0 lg:ml-auto"> 
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="relative w-full h-full"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={images[currentImageIndex]}
                    alt={`App Screenshot ${currentImageIndex + 1}`}
                    fill
                    className="object-cover rounded-2xl" 
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentImageIndex === index 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 w-2 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppShowcase;