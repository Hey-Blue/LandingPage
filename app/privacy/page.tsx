"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import Footer from "@/components/Footer"
import Header from "@/components/Header";


export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
    <Header />
      <ScrollArea className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <iframe
              src="https://utfs.io/f/xPb29TA7HRGZNHogjj2CL4FJj6ySPmTvxodwtKYGU7I2aEeB"
              className="w-full h-[800px]"
              title="Terms of Service"
            />
          </div>
        </div>
      </ScrollArea>
      <Footer />
    </div>
  )
}