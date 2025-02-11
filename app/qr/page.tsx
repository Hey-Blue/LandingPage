"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"

function DisabledPage() {
  const [platform, setPlatform] = useState<string | null>(null)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios')
    } else if (/android/.test(userAgent)) {
      setPlatform('android')
    }
  }, [])

  const getStoreLink = () => {
    if (platform === 'ios') {
      return 'https://apps.apple.com/us/app/hey-blue/id6499293126'
    } else if (platform === 'android') {
      return 'https://play.google.com/store/apps/details?id=com.development.heyblue&hl=en_US'
    }
    return '/app'
  }

  const getButtonText = () => {
    if (platform === 'ios') {
      return 'Download on the App Store'
    } else if (platform === 'android') {
      return 'Get it on Google Play'
    }
    return 'Download the App!'
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-24">
      <div className="flex flex-col items-center text-center space-y-12">
        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src="/assets/logo.png"
          alt="Hey Blue Logo"
          className="w-56 h-auto drop-shadow-xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl p-8 
            shadow-xl border border-gray-200 dark:border-slate-700 max-w-lg"
        >
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-blue-500/10 dark:bg-blue-500/20 rounded-full 
              flex items-center justify-center shadow-lg shadow-blue-500/10">
              <svg className="w-10 h-10 text-blue-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                QR Scanning Temporarily Disabled
              </h1>
              <p className="text-gray-700 dark:text-white/90 text-lg leading-relaxed">
                Web-based QR scanning is currently disabled. 
                Please use the Hey Blue mobile app to scan QR codes and connect with officers.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-6"
        >
          <p className="text-gray-800 dark:text-white/90 font-medium text-xl">
            Download the Hey Blue app to:
          </p>
          <ul className="text-gray-700 dark:text-white/80 space-y-2 text-lg">
            <li>• Scan QR codes to connect with officers</li>
            <li>• Track your connections and earn points</li>
            <li>• Access all Hey Blue features</li>
          </ul>
          
          <a 
            href={getStoreLink()}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white 
              font-semibold rounded-xl hover:bg-blue-700 transition duration-200 
              transform hover:scale-105 shadow-lg mt-6"
          >
            {platform === 'ios' && (
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
                alt="Apple" 
                className="mr-2"
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
            )}
            {platform === 'android' && (
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52z"/>
              </svg>
            )}
            {getButtonText()}
          </a>
        </motion.div>
      </div>
    </div>
  )
}

// Main page component
export default function QRPage() {
  return (
    <div className="relative min-h-screen pt-20">
      <DisabledPage />
    </div>
  )
}