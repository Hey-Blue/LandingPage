"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserAlt, FaBuilding } from 'react-icons/fa';
import { GiRoundStar , GiPoliceBadge } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';

import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  
  const loginDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLoginDropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/donate', label: 'Donate' },
  ];

  
  const loginOptions = [
    { href: 'https://app.heyblue.us', label: 'Community Member', icon: <FaUserAlt className="mr-2" /> },
    { href: 'https://app.heyblue.us', label: 'Police', icon: <GiPoliceBadge  className="mr-2" /> },
    { href: 'https://portal.heyblue.us', label: 'Police Supervisor', icon: <GiRoundStar className="mr-2" /> },
    { href: 'https://portal.heyblue.us', label: 'Organization', icon: <FaBuilding className="mr-2" /> },
  ];
  

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isLoginDropdownOpen &&
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLoginDropdownOpen(false);
      }
      if (
        isMobileMenuOpen &&
        mobileLoginDropdownRef.current &&
        !mobileLoginDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLoginDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoginDropdownOpen, isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="transition-transform hover:scale-105">
            <Image
              src="/assets/logo.png"
              alt="Hey Blue Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Login Dropdown */}
            <div className="relative" ref={loginDropdownRef}>
              <Button
                variant="outline"
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                className="flex items-center gap-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 px-6 py-2 text-gray-700 hover:text-gray-900 shadow-sm transition-all duration-200 hover:shadow-md"
                aria-haspopup="true"
                aria-expanded={isLoginDropdownOpen}
              >
                <HiUserGroup className="w-5 h-5" />
                <span>Account Login</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isLoginDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </Button>
              <AnimatePresence>
                {isLoginDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50"
                  >
                    <div className="py-1">
                      {loginOptions.map((option) => (
                        <a
                          key={option.label}
                          href={option.href}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsLoginDropdownOpen(false)}
                        >
                          {option.icon}
                          {option.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 z-50 bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Mobile Menu"
          >
            <svg
              className={`w-6 h-6 transition-colors ${isMobileMenuOpen ? 'text-blue-600' : 'text-gray-600'}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 md:hidden backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white shadow-lg z-50"
            >
              <div className="flex flex-col h-full">
                <div className="flex flex-col pt-24 px-6 flex-grow bg-gradient-to-b from-white to-gray-50">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-4 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Mobile Login Dropdown */}
                  <div className="relative mt-4" ref={mobileLoginDropdownRef}>
                    <Button
                      variant="outline"
                      onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                      className="w-full flex items-center justify-between rounded-xl bg-white hover:bg-gray-50 border border-gray-200 px-6 py-2 text-gray-700 hover:text-gray-900 shadow-sm transition-all duration-200"
                      aria-haspopup="true"
                      aria-expanded={isLoginDropdownOpen}
                    >
                      <div className="flex items-center gap-2">
                        <HiUserGroup className="w-5 h-5" />
                        <span>Account Login</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          isLoginDropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 9l-7 7-7-7" 
                        />
                      </svg>
                    </Button>
                    <AnimatePresence>
                      {isLoginDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 space-y-2 overflow-hidden"
                        >
                          {loginOptions.map((option) => (
                            <a
                              key={option.label}
                              href={option.href}
                              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsLoginDropdownOpen(false);
                              }}
                            >
                              {option.icon}
                              {option.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;