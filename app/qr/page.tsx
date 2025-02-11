"use client"
import { Suspense, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"
import Footer from "@/components/Footer"
import { useSearchParams } from 'next/navigation'
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { auth, functions } from '@/firebaseConfig'
import Image from 'next/image'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

function InvalidParams({ message }: { message: string }) {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-24">
      <div className="flex flex-col items-center text-center space-y-8">
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
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 
            shadow-xl border border-white/20 max-w-lg"
        >
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full 
              flex items-center justify-center shadow-lg shadow-red-500/10">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">Invalid QR Code</h2>
              <p className="text-white text-lg">{message}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-center"
    >
      <div className="w-20 h-20 mx-auto">
        <svg 
          className="animate-spin text-white w-full h-full" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <p className="text-white text-xl font-medium">
        Creating connection...
      </p>
      <p className="text-white/80">
        Please wait while we process your interaction
      </p>
    </motion.div>
  )
}

function QRContent() {
  const searchParams = useSearchParams()
  const QR = searchParams.get('QR')
  const UID = searchParams.get('UID')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)
  const [success, setSuccess] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [platform, setPlatform] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const scrollToTop = () => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  interface ConnectionData {
    status: number;
    message: string;
  }

  const [connectionData, setConnectionData] = useState<ConnectionData | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios')
    } else if (/android/.test(userAgent)) {
      setPlatform('android')
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (success) {
      setShowPopup(true);
    }
  }, [success]);

  if (!QR || !UID) {
    return <InvalidParams message="Missing QR or UID parameters" />
  }

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

  const registerMember = async (uid: string, email: string, name: string) => {
    const registerCommunityMember = httpsCallable(functions, 'register-community-member')
    await registerCommunityMember({ 
      uid,
      name,
      phone: " ",
      email
    })
  }

  const checkUserExists = async (uid: string) => {
    const userDoc = await getDoc(doc(db, 'users', uid))
    return userDoc.exists()
  }

  const createConnectionRequest = async (userUID: string) => {
    const connectionRequest = httpsCallable(functions, 'connection-request')
    const result = await connectionRequest({
      communityMemberUID: userUID,
      policeOfficerUID: UID, 
      QRKey: QR, 
      timestamp: new Date().toISOString(),
      isWeb: true,
      userLocation: null
    })
    setConnectionData(result.data as ConnectionData)
    setSuccess(true)
    setLoading(false)
    setTimeout(() => {
      scrollToTop()
    }, 100)
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      
      const userExists = await checkUserExists(result.user.uid)
      
      if (!userExists) {
        await registerMember(
          result.user.uid,
          result.user.email || '',
          result.user.displayName || ''
        )
      }
      await createConnectionRequest(result.user.uid)
    } catch (err) {
      setError("Google account sign-in failed. Please try again or create an account below.")
      console.error(err)
      setLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isSignUp) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password)
        await registerMember(userCred.user.uid, email, name)
        await createConnectionRequest(userCred.user.uid)
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        await createConnectionRequest(userCred.user.uid)
      }
    } catch (err) {
      if (isSignUp && (err instanceof Error && (err as { code?: string }).code === 'auth/email-already-in-use')) {
        setError('Your account already exists. Please sign in instead.')
      } else {
        setError(isSignUp ? 'Failed to create account' : 'Failed to sign in')
      }
      console.error(err)
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <div ref={containerRef} className="container max-w-4xl mx-auto px-4 py-24 relative">
      <div className="flex flex-col items-center text-center space-y-12">
        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src="/assets/logo.png"
          alt="Hey Blue Logo"
          className="w-56 h-auto drop-shadow-xl"
        />

        {loading && <LoadingSpinner />}

        {!loading && success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 max-w-lg mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center 
              shadow-xl border border-white/20">
              {connectionData?.status === 400 ? (
                <div className="space-y-6">
                  <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center 
                    shadow-lg shadow-red-500/10">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-white">
                      {connectionData.message}
                    </h2>
                    <p className="text-white text-lg">
                      {connectionData.message.includes("QR Code") && 
                        "This QR code has expired. Please ask the officer for a new code."}
                      {connectionData.message.includes("24 hours") && 
                        "Please try connecting with a different officer or wait until the cooldown period ends."}
                      {connectionData.message.includes("location") && 
                        "The officer needs to enable location sharing to make a connection."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center
                    shadow-lg shadow-emerald-500/10">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-white">
                      Connection Successful!
                    </h2>
                    <p className="text-white text-lg">
                      Thank you for connecting with your local law enforcement. Your points will be added to your account.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-4"
            >
              <p className="text-white/90 font-medium">
                Get the Hey Blue app to:
              </p>
              <ul className="text-white/80 space-y-2">
                <li>• Track your connections</li>
                <li>• Earn more points</li>
                <li>• Connect with more officers</li>
              </ul>
              <a 
                href={getStoreLink()}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-800 
                  font-semibold rounded-xl hover:bg-gray-100 transition duration-200 
                  transform hover:scale-105 shadow-lg mt-4"
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
          </motion.div>
        ) : !loading && user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 max-w-lg mx-auto"
          >
            <h2 className="text-2xl font-bold text-white">Welcome back, {user.email}</h2>
            <p className="text-white text-lg">
              You are already signed in. Would you like to create a connection?
            </p>
            <button
              onClick={() => { setLoading(true); createConnectionRequest(user.uid); }}
              className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg 
                hover:bg-gray-100 transition duration-200"
            >
              Create Connection
            </button>
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg 
                hover:bg-red-600 transition duration-200 mt-4"
            >
              Log Out
            </button>
          </motion.div>
        ) : !loading ? (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
              You&apos;ve Scanned an Officer&apos;s QR Code!
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-white/40 via-white to-white/40 rounded-full mx-auto" />
            
            <p className="text-xl text-white/90 leading-relaxed font-light">
              {isSignUp 
                ? "Create an account to claim this interaction and start building positive connections in your community."
                : "Welcome back! Sign in to claim this interaction."}
            </p>

            <div className="space-y-6 w-full max-w-md mx-auto">
              {error && (
                <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={signInWithGoogle}
                disabled={loading}
                className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg 
                  shadow-md hover:bg-gray-100 transition duration-200 flex items-center 
                  justify-center space-x-2 disabled:opacity-50"
              >
                <Image 
                  src="/assets/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span>Continue with Google</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-white/60 bg-[#4facfe]">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-white/80 hover:text-white underline text-sm"
                  >
                    {isSignUp 
                      ? 'Already have an account? Sign in' 
                      : "Don't have an account? Sign up"}
                  </button>
                </div>
                
                {isSignUp && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white 
                      placeholder-white/60 border border-white/20"
                    required
                  />
                )}
                
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white 
                    placeholder-white/60 border border-white/20"
                  required
                />
                
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white 
                    placeholder-white/60 border border-white/20"
                  required
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-gray-800 font-semibold py-3 px-6 
                    rounded-lg hover:bg-gray-100 transition duration-200 
                    disabled:opacity-50"
                >
                  {loading 
                    ? 'Processing...' 
                    : (isSignUp ? 'Create Free Account' : 'Sign In')}
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200 rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto p-1"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 
                  w-8 h-8 flex items-center justify-center rounded-full 
                  bg-white/80 hover:bg-white transition-all duration-200"
                onClick={() => setShowPopup(false)}
              >
                ✕
              </button>
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-500 
                  bg-clip-text text-transparent">
                  Don&apos;t Miss Out!
                </h2>
                <p className="mb-6 text-gray-700">
                  Download the Hey, Blue! app now to maximize your experience!
                </p>
                <a
                  href={getStoreLink()}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r 
                    from-blue-600 to-blue-500 text-white font-semibold rounded-full 
                    hover:from-blue-700 hover:to-blue-600 transition duration-200 shadow-lg"
                >
                  {getButtonText()}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

// Main page component
export default function QRPage() {
  return (
    <div className="relative min-h-screen">
      <ScrollArea className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">
        <Suspense fallback={
          <div className="container max-w-4xl mx-auto px-4 py-24 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-xl"
            >
              Loading...
            </motion.div>
          </div>
        }>
          <QRContent />
        </Suspense>
      </ScrollArea>
      <Footer />
    </div>
  )
}