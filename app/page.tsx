"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from '@/hooks/useAppStore';
import { motion } from 'framer-motion';
import { Timeline } from '@/components/landingPage/Timeline';
import { timelineEvents } from '@/public/data/timeline/timeline';
import { MailingListSignup } from '@/components/MailingListSignup';

const MapWithNoSSR = dynamic(
  () => import('@/components/landingPage/MapWrapper'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-[700px] bg-blue-50 animate-pulse" />
  }
);

const SponsorSlider = () => {
  const sponsors = [
    { image: "https://utfs.io/f/xPb29TA7HRGZBQXV4dCF6HvfZwI3aBtEhsk9AnU5S0ojbzXD", link: "https://www.brevardprevention.org/" },
    { image: "https://utfs.io/f/xPb29TA7HRGZQo94Ub3fEJyDl4KCT95AqSx6wHbn1I2PW70m", link: "https://www.southstatebank.com/personal" },
    { image: "https://utfs.io/f/xPb29TA7HRGZl4d9uCL6m189ZwU2WESH4Fc0BbRgDn3YGIqa", link: "https://na.panasonic.com/" },
    { image: "https://utfs.io/f/xPb29TA7HRGZLId7V9Z91EfDaAt2gSTH7JwOeo3kGbWIzCsL", link: "https://cfbrevard.org/" },
    { image: "https://utfs.io/f/xPb29TA7HRGZfDDk7VUXtyD8LoWCv1n7YE6ZM52gJQSbTaBc", link: "https://www.cflbigs.org/" },
    { image: "https://utfs.io/f/xPb29TA7HRGZc2kZdmVWeUbsDjS4r2vpq9kOMCYP6GiTZ85a", link: "https://youngblackandlit.org/" },
    { image: "https://utfs.io/f/xPb29TA7HRGZHkmuMBWURftSPJizr35QqEsMyxoZ0WbgdOV1", link: "https://www.charlieandjakes.com/" },
    { image: "https://utfs.io/f/xPb29TA7HRGZcbmFRPVWeUbsDjS4r2vpq9kOMCYP6GiTZ85a", link: "https://www.masatacos.com/" },
    { image: "https://utfs.io/f/xPb29TA7HRGZkGo9SPeMiP9FjxuWmR638wBZ2thdebOJySIv", link: "https://www.benjerry.com/" },
    { image: "https://utfs.io/f/xPb29TA7HRGZ5TMafDczAt6lwDp41dFr7vEfXShHzabKmoik", link: "https://www.bunkysrawbar.com/" },
    { image: "https://utmbvtrp5h.ufs.sh/f/CXXm4k0yX8RBHk7EtjrLogU57YqZbjDmhk0izyIwGKxFc1ld", link: "https://www.cypressbanktrust.com/" },
    { image: "https://utmbvtrp5h.ufs.sh/f/CXXm4k0yX8RBHiStz1rLogU57YqZbjDmhk0izyIwGKxFc1ld", link: "https://www.launchcu.com/" },
    { image: "https://utmbvtrp5h.ufs.sh/f/CXXm4k0yX8RBc6e8jXPxWSaYxR2VgwsrlUKFyJH3vP018BfQ", link: "https://endeavour.fruitvale.k12.ca.us/" }
  ];

  const sliderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let scrollAmount = 0;
    let animationFrameId: number;
    let scrollSpeed = 0.5; 

    if (typeof window !== 'undefined') {
      scrollSpeed = window.innerWidth < 768 ? 0.3 : 0.5;
    }

    const scrollSlider = () => {
      const slider = sliderRef.current;
      if (slider) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= slider.scrollWidth / 2) {
          scrollAmount = 0;
        }
        slider.style.transform = `translateX(-${scrollAmount}px)`;
      }
      animationFrameId = requestAnimationFrame(scrollSlider);
    };

    animationFrameId = requestAnimationFrame(scrollSlider);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
          Thanks to Our Excellent Sponsors and Partners!
        </h2>

        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex space-x-4 md:space-x-8"
            style={{ width: 'max-content' }}
          >
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                key={`sponsor-${index}`}
                className="flex-shrink-0 w-32 h-16 md:w-48 md:h-24"
              >
                <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={sponsor.image}
                    alt={`Sponsor ${index + 1}`}
                    className="object-contain w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const { getStoreLink, getButtonText } = useAppStore();

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#13d2eb]/70 pt-16">
        <ScrollArea>
          <section className="w-full h-[700px]">
            <Suspense fallback={<div className="w-full h-[700px] bg-blue-50 animate-pulse" />}>
              <MapWithNoSSR />
            </Suspense>
          </section>

          <section className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 py-16 space-y-12">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              src="/assets/logo.png" 
              alt="Hey Blue Logo" 
              className="w-56 h-auto drop-shadow-xl md:ml-[calc(0%+28px)]"
            />
            
            <motion.div
              key="landing-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-white drop-shadow-lg">
                COMMUNITY. CONNECTION. CHANGE.
              </h1>
              
              <div className="w-32 h-1 bg-gradient-to-r from-white/40 via-white to-white/40 rounded-full mx-auto" />
              
              <div className="text-2xl text-white/90 leading-relaxed font-normal max-w-3xl">
                Hey, Blue! facilitates meaningful connections between police officers 
                and the community they serve by offering intentional opportunities 
                for individuals to meet and create positive experiences.
                <span className="block mt-3 font-medium text-2xl">#HeyBlue</span>
              </div>
            </motion.div>
          </section>

            <div className="container mx-auto text-center">
                <MailingListSignup />
            </div>

          <section className="bg-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
            <div className="container mx-auto text-center px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                  Download the Hey, Blue! App
                </h2>
                
                <div className="text-2xl text-black-700 max-w-6xl mx-auto mb-12 leading-relaxed">
                  To achieve our mission of connecting police officers and their communities, 
                  Hey, Blue! is developing a mobile platform that incentivizes these positive 
                  interactions through a digital point system.
                </div>

                <button 
                  className="bg-gradient-to-r from-blue-600 to-blue-500 
                    hover:from-blue-700 hover:to-blue-600 
                    text-white rounded-full px-12 py-6 
                    text-2xl font-bold shadow-xl 
                    hover:shadow-2xl transform hover:-translate-y-1 
                    transition-all duration-300"
                  onClick={() => window.location.href = getStoreLink()}
                >
                  {getButtonText()}
                </button>
              </motion.div>
            </div>
          </section>
          
          <section className="bg-gradient-to-b from-gray-50 to-white py-24">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://utfs.io/f/xPb29TA7HRGZXOsgkmh5Ev43V5LUQ7PYSyd6DfKHRbrogCBm"
                    alt="Community Impact"
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8 text-center lg:text-left"
                >
                  <div className="text-3xl text-black-700 leading-relaxed font-bold text-center">
                    Hey, Blue! is a tech nonprofit that works with police and businesses to strengthen the bonds within communities.
                  </div>
                  <div className="text-xl text-black-700 leading-relaxed text-center">
                    Through the Hey, Blue! Mobile Platform, every positive interaction represents a bond forged, a friendship created, a community built, brick by brick.
                  </div>
                  <div className="text-xl text-black-700 leading-relaxed text-center">
                    By facilitating communication between police officers and their community members, we can help bridge the gap between them, uniting them to address challenges collaboratively rather than confronting them alone.
                  </div>
                  <div className="text-xl text-black-700 leading-relaxed text-center">
                    Hey, Blue! has already found ways to improve local communities through local fundraisers, dinners, and other events.
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          <Timeline events={timelineEvents} />
          <SponsorSlider />
        </ScrollArea>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
