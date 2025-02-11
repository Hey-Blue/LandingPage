"use client";

import React, { useEffect, useState, useRef } from "react";

const openRunSlides = [
  {
    city: 'Cocoa',
    venue: 'Joe Lee Smith Center',
    date: 'Aug 10',
    time: '1PM – 4PM',
    img: 'https://0k7xfd4l3w.ufs.sh/f/9L5PPwm4ZlGKQgqSKxJwR7ZTaE5zX3KWM8JpVGhsNDvbyCSm'
  },
  {
    city: 'Melbourne',
    venue: 'Eau Gallie Civic Center',
    date: 'Aug 17',
    time: '1PM – 4PM',
    img: 'https://0k7xfd4l3w.ufs.sh/f/9L5PPwm4ZlGK9IRMeX4ZlGKXTnVy175tgFLsDo4RkYv60QE2'
  },
  {
    city: 'Palm Bay',
    venue: 'Tony Rosa Community Center',
    date: 'Aug 24',
    time: '9AM – 12PM',
    img: 'https://0k7xfd4l3w.ufs.sh/f/9L5PPwm4ZlGKTXCnyZosbzh1RHqemsa0g72MLtnZlxIYDEWp'
  },
  {
    city: 'Satellite Beach',
    venue: 'Rec Center',
    date: 'Sept 7',
    time: '5PM – 9PM',
    img: 'https://0k7xfd4l3w.ufs.sh/f/9L5PPwm4ZlGKbmiG31vTZREM5hWt67n1OVuQ9XLKelyJvNB8'
  },
  {
    city: 'Titusville',
    venue: 'YMCA',
    date: 'Sept 7',
    time: '12PM – 3PM',
    img: 'https://0k7xfd4l3w.ufs.sh/f/9L5PPwm4ZlGKylvEixmeWYLHAOS1Jt2PEGFum38B49poDX6g'
  }
];

const TournamentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: '',
    location: '',
    phone: '',
    jerseySize: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          age: formData.age,
          location: formData.location,
          phone: formData.phone,
          jerseySize: formData.jerseySize
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ email: '', name: '', age: '', location: '', phone: '', jerseySize: '' });
      } else {
        setError(result.error || 'Failed to submit registration');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto mt-20 px-6 md:px-12 py-16">
      <div className="relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-blue-500/10 to-indigo-600/20 rounded-3xl blur-3xl"></div>
        
  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 px-8 py-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                Sign up for Open Runs
              </h2>
              <p className="text-sky-100 text-lg md:text-xl leading-relaxed">
                Be part of the Second Annual Sixth Man Tournament and help bridge communities through basketball
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    You&apos;re All Set! 🏀
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Thank you for registering! We&apos;ll be in touch with tournament details and your team assignment soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                                  className="w-full px-6 py-4 bg-white/95 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/95 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/95 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Your age"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/95 dark:bg-slate-800/60 border-2 border-gray-200 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                      Brevard County Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/95 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="e.g., Melbourne, Cocoa, Titusville"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="jerseySize" className="block text-sm font-semibold text-gray-700 mb-2">
                      Jersey Size
                    </label>
                    <select
                      id="jerseySize"
                      name="jerseySize"
                      value={formData.jerseySize}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/95 dark:bg-slate-800/60 border-2 border-gray-200 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select your size</option>
                      <option value="XS">XS - Extra Small</option>
                      <option value="S">S - Small</option>
                      <option value="M">M - Medium</option>
                      <option value="L">L - Large</option>
                      <option value="XL">XL - Extra Large</option>
                      <option value="XXL">XXL - Double Extra Large</option>
                    </select>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-8">
                  <div className="text-yellow-800 space-y-2">
                    <p><strong>⚠️ Important Commitment:</strong> By signing up you are committing to playing in an all-day tournament on October 11th, 2025 at Satellite Beach High School. Tentatively (10am-6pm)</p>
                    <p><strong>📋 Requirements:</strong> Please sign-up providing your name, age, phone number, email address and where you live in Brevard County. You must be ages 13-17 to participate.</p>
                    <p><strong>❓ Questions?</strong> Email John Verdi at <a href="mailto:info@heyblue.app" className="text-blue-600 hover:text-blue-800 underline">info@heyblue.app</a></p>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-3 text-gray-900 dark:text-white">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          <span className="text-lg">Submitting Registration...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-lg">Register for Tournament</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CountdownNumber = ({ value }: { value: number }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 200);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <span
      className={`inline-block transition-transform duration-200 font-extrabold ${
        animate ? "scale-110 text-sky-400 drop-shadow-lg" : "scale-100 text-gray-900"
      }`}
    >
      {value}
    </span>
  );
};

const getTimeLeft = () => {
  const now = new Date();
  const target = new Date("2025-10-11T00:00:00");

  const temp = new Date(now.getTime());
  let months = 0;
  while (temp < target) {
    temp.setMonth(temp.getMonth() + 1);
    if (temp <= target) {
      months++;
    } else {
      temp.setMonth(temp.getMonth() - 1);
      break;
    }
  }

  const remainingMs = target.getTime() - temp.getTime();
  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { months, days, hours, minutes, seconds };
};

const EmptyTournamentPage = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes backgroundRotate {
          0%, 100% {
            background-image: url('https://kgaduw4eg5.ufs.sh/f/9uvKp87YcEsOlLxiLV0gMSItgH5DqFoGc9BAb1Nup6O0jfdT');
          }
          25% {
            background-image: url('https://kgaduw4eg5.ufs.sh/f/9uvKp87YcEsOdMw8G7R2vFxihUCZ9LNu2Y3z0QeTE4cPSJ6D');
          }
          50% {
            background-image: url('https://kgaduw4eg5.ufs.sh/f/9uvKp87YcEsO9smCnQ7YcEsOr7QyTUSGljxJwhvkF1X9Km2z');
          }
          75% {
            background-image: url('https://kgaduw4eg5.ufs.sh/f/9uvKp87YcEsOw67AhzSXOiQbpnmBfzyYrhPR418xTFKqWAUZ');
          }
        }
      .rotating-background {
        animation: backgroundRotate 40s infinite;
        transition: background-image 3s ease-in-out;
        will-change: background-image;

        height: 1250px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
      `}</style>

  <div className="min-h-screen">
      <div>
            <div className="rotating-background flex flex-col items-center justify-center w-full h-screen px-4">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl px-10 py-12 shadow-2xl border border-gray-200">
              <h1
                className="text-6xl md:text-8xl font-extrabold mb-6 text-gray-900"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Sixth Man Tournament
              </h1>
              <div className="mb-2 text-center text-gray-800">
                <p className="text-lg font-medium text-gray-700 tracking-wide">
                  Get ready! Countdown to the Second Annual Sixth Man Tournament.
                </p>
              </div>
              <div
                role="timer"
                className="flex justify-center flex-wrap gap-10 font-mono text-3xl sm:text-3xl select-none"
              >
                {isMounted ? (
                  [
                    { label: "Months", value: timeLeft.months },
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center bg-white/95 rounded-xl px-6 py-4 shadow-lg border border-blue-100/40 min-w-[90px]"
                    >
                      <CountdownNumber value={value} />
                      <span className="mt-1 text-blue-600 uppercase tracking-widest text-sm sm:text-base">
                        {label}
                      </span>
                    </div>
                  ))
                ) : (
                  // Placeholder skeleton during SSR to prevent layout shift
                  [
                    { label: "Months" },
                    { label: "Days" },
                    { label: "Hours" },
                    { label: "Minutes" },
                    { label: "Seconds" },
                  ].map(({ label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center bg-white/95 rounded-xl px-6 py-4 shadow-lg border border-blue-100/40 min-w-[90px]"
                    >
                      <span className="inline-block transition-transform duration-200 font-extrabold scale-100 text-gray-900">
                        --
                      </span>
                      <span className="mt-1 text-blue-600 uppercase tracking-widest text-sm sm:text-base">
                        {label}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        <section className="max-w-6xl mx-auto mt-20 px-6 md:px-12 py-10 ">

          <div className="bg-white/95 rounded-3xl shadow-lg p-16 border border-gray-300">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6 underline">
                            Event Details
                        </h2>
              </div>

            <div className="md:w-2/3 font-semibold text-xl md:text-2xl">
                <h3><p><strong>- October 11, 2025 | 10AM – 3PM</strong></p></h3>
                <h3><p><strong>- Satellite High School, Satellite Beach, FL</strong></p></h3>
                <h3><p><strong>- Basketball clinic by Dr. Jumaine Jones</strong></p></h3>
            </div>
          </div>
        </div>

        </section>
          
          <section className="max-w-6xl mx-auto mt-16 px-6 md:px-12">
  <OpenRunCarousel />
</section>

          <section className="max-w-6xl mx-auto mt-16 px-6 md:px-12 py-14 grid md:grid-cols-2 gap-12">
            <div className="bg-white/95 rounded-2xl p-8 shadow-md border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Open Run Opportunities</h3>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                <li><strong>8/10:</strong> Cocoa - Joe Lee Smith Center (1PM-4PM)</li>
                <li><strong>8/17:</strong> Melbourne – Eau Gallie Civic Center (1PM–4PM)</li>
                <li><strong>8/24:</strong> Palm Bay - Tony Rosa Community Center (9AM - 12PM)</li>
                <li><strong>9/7:</strong> Satellite Beach – Rec Center (5PM–9PM)</li>
                <li><strong>9/7:</strong> Titusville - YMCA (12PM-3PM)</li>
              </ul>
            </div>
            <div className="bg-white/95 rounded-2xl p-8 shadow-md border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Tournament Details</h3>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                <li>6 teams with 6 players per team</li>
                <li>Teams include police and kids ages 13-17</li>
                <li>Bracket-style competition format</li>
                <li>Enjoy food trucks with live music, games, and fun activities!</li>
              </ul>
            </div>
          </section>

          <TournamentRegistrationForm />
          
          <section className="max-w-4xl mx-auto px-24 py-12">
            <div className="bg-white/95 rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 text-left pt-8">
                  Support the Tournament
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed text-left">
                  Help make the Sixth Man Tournament possible! Donate today and receive special packages and recognition
                  based on your sponsorship level.
                </p>
              </div>
                <div className="text-center pt-4">
                  <img
                    src="https://kgaduw4eg5.ufs.sh/f/9uvKp87YcEsO14FmJ2q7OKnoChfHwqISkp3Gcy4etJVDrBsY"
                    alt="Scan to Donate"
                    className="h-32 rounded-xl border border-gray-300 mx-auto"
                  />
                  <div className="flex flex-col items-center gap-4 w-full md:w-auto pt-4">
                <a
                  href="https://tinyurl.com/THE-SIXTH-MAN-SUPPORTER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl shadow text-center w-full md:w-48"
                >
                  Donate Now
                </a>
                </div>
              </div>
            </div>
          </section>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <video
              src="https://kgaduw4eg5.ufs.sh/f/9uvKp87YcEsOdVw9k02vFxihUCZ9LNu2Y3z0QeTE4cPSJ6Dn"
              controls
              className="w-full rounded-3xl shadow-xl border border-gray-300"
              preload="metadata"
            />
          </section>

          <div className="text-center max-w-3xl mx-auto py-12 px-4">
            <p className="text-xl font-semibold text-gray-900 max-w-xl mx-auto text-center leading-snug">
              Let’s bridge the gap between the community
              <br />
              and law enforcement—one game at a time.
            </p>
            <p className="mt-4 text-lg text-gray-700">We hope to see you there!</p>
          </div>
          <section className="bg-white/85 border-t border-gray-300 py-8 text-center">
            <p className="text-gray-700 text-lg">
              Thank you to all our sponsors!
            </p>
             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center items-start">
  <div className="flex flex-col items-center w-64 bg-white/95 rounded-xl p-4 shadow-sm border border-gray-100/30 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <a href="https://www.cypressbanktrust.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://utmbvtrp5h.ufs.sh/f/CXXm4k0yX8RBHk7EtjrLogU57YqZbjDmhk0izyIwGKxFc1ld"
                    alt="Cypress Bank Trust Logo"
                    className="h-40 object-contain hover:opacity-80 transition-opacity"
                  />
                </a>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>Cypress Bank Trust</strong>
                </p>
              </div>
                <div className="flex flex-col items-center w-64 bg-white/95 rounded-xl p-4 shadow-sm border border-gray-100/30 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <a href="https://www.allaluminumscreening.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://kgaduw4eg5.ufs.sh/f/9uvKp87YcEsONq15JrZjObL8YK45UrWFCuhijxn2HIEvVZzS"
                    alt="All Aluminum and Screenings Logo"
                    className="h-40 object-contain hover:opacity-80 transition-opacity"
                  />
                </a>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>All Aluminum and Screenings</strong>
                </p>
              </div>
             <div className="flex flex-col items-center w-64 bg-white/95 rounded-xl p-4 shadow-sm border border-gray-100/30 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <a href="https://www.charlieandjakes.com/" target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://utfs.io/f/xPb29TA7HRGZHkmuMBWURftSPJizr35QqEsMyxoZ0WbgdOV1"
                    alt="Charlie &amp; Jake&apos;s Barbecue Logo"
                    className="h-40 object-contain hover:opacity-80 transition-opacity"
                  />
                </a>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>Charlie &amp; Jake&apos;s Barbecue</strong>
                </p>
                <p className="text-gray-600 text-xs mt-1">Pre-tournament dinner sponsor</p>
              </div>
             <div className="flex flex-col items-center w-64 bg-white/95 rounded-xl p-4 shadow-sm border border-gray-100/30 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <a href="https://www.edmondtriallaw.com/" target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://0tkp56z0pn.ufs.sh/f/xPb29TA7HRGZEo3dPLwI8nvFfEmBzJ605wo1xUrNgYPpZAay"
                    alt="Edmond Law Logo"
                    className="h-40 object-contain hover:opacity-80 transition-opacity"
                  />
                </a>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>Edmond Law</strong>
                </p>
              </div>
  <div className="flex flex-col items-center w-64 bg-white/95 rounded-xl p-4 shadow-sm border border-gray-100/30 hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center justify-center">
        <p className="text-gray-700 text-sm mt-2">
          <strong>The Hemphill Family</strong>
          <span className="block text-xs mt-1">Ramone and Shannon Hemphill</span>
        </p>
      </div>
            </div>
            <p className="text-gray-700 text-lg mt-6">
              <span className="block">Special thanks to <strong>Cypress Bank Trust</strong>, <strong>All Aluminum and Screenings</strong>, <strong>Charlie &amp; Jake&apos;s Barbecue</strong>, <strong>Edmond Law</strong>, and <strong>The Hemphill Family</strong> for supporting the tournament!</span>
               </p>
          </section>
        </div>
      </div>
    </>
  );` `
};

const OpenRunCarousel = () => {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const slides = openRunSlides;
  const count = slides.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hover || count <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % count);
    }, 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hover, count]);

  const goTo = (i: number) => setIndex((i + count) % count);

  return (
    <div
  className="bg-white/95 rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-10 relative overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3 className="text-4xl font-semibold mb-8 text-gray-900 text-center">
        Open Run Opportunities
      </h3>

      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="min-w-full flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-1/2">
                <img
                  src={s.img}
                  alt={`${s.city} Open Run`}
                  className="w-full h-64 object-cover rounded-2xl shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{s.city}</h4>
                <p className="text-xl text-gray-700 font-medium mb-1">{s.venue}</p>
                <p className="text-lg text-gray-600">{s.date} • {s.time}</p>
              </div>
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              aria-label="Previous"
              onClick={() => goTo(index - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              aria-label="Next"
              onClick={() => goTo(index + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {count > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === index
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyTournamentPage;