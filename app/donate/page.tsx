"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const DonatePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://utfs.io/f/xPb29TA7HRGZ81gje84DDkyEAZRo1QjvBmgutPUx3NrX4bMJ",
    "https://utfs.io/f/xPb29TA7HRGZDsXSsY95rzopZWmU79KsexFtOYayv6Lqhi0l",
    "https://utfs.io/f/xPb29TA7HRGZxMKpqjA7HRGZmJsIt64KNOeFrWonif1pBgEa",
    "https://utfs.io/f/xPb29TA7HRGZgF3eBhr0zNX89xtPFiHBDWjvSeuhaOE63LAr"
  ];

  const stats = [
    { value: '10000+', label: 'Positive Interactions' },
    { value: '50+', label: 'Communities Served' },
    { value: '500+', label: 'Officers Engaged' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
  <div className="relative min-h-screen overflow-hidden pt-20 bg-white"> 
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out" 
            style={{ 
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 1 : 0 
            }}
          >
            <Image
              src={image}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === currentImageIndex} 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-black/80" />
          </div>
        ))}

        <div className="relative z-10 min-h-screen flex items-center justify-end px-4 md:px-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-xl text-center border border-gray-200">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                  Make an <span className="text-blue-500">Impact</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 font-medium">
                  Your donation helps build stronger connections between law enforcement and communities across America.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

        <div>
                <Button 
                  onClick={() => window.location.href = "https://www.paypal.com/donate/?hosted_button_id=GN9Y9G3Q9XHD2&Z3JncnB0="
                  }
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Donate Now
                </Button>
                <p className="text-gray-500 text-sm mt-4 text-center">
                  All donations are securely processed through PayPal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonatePage;