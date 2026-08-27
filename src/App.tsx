import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Mail, Rocket, User, Users, CheckCircle2, Star, StarHalf, Search, ChevronRight, Lock, Home, Car, GraduationCap, HeartPulse, Gift, Plane, CreditCard, Bike, Coins, Monitor, Briefcase } from 'lucide-react';

const Logo = ({ className = "" }: { className?: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 17L17 7M7 23L23 7M13 25L25 13" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WavyPattern = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-16 -right-16 w-[400px] h-[400px] text-[#F3F4F6] pointer-events-none">
    <path d="M40 160L160 40M40 220L220 40M100 240L240 100M160 260L260 160" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.365 14.717c-.013-3.238 2.656-4.786 2.775-4.86-1.503-2.195-3.83-2.493-4.66-2.545-1.986-.199-3.882 1.171-4.887 1.171-1.018 0-2.576-1.144-4.22-.111-2.128 1.34-3.75 4.636-3.75 8.136 0 3.513 2.158 6.786 4.39 10.02 1.077 1.558 2.327 3.308 3.978 3.242 1.583-.066 2.183-1.026 4.098-1.026 1.916 0 2.477 1.026 4.13 1.026 1.692 0 2.784-1.578 3.844-3.12 1.228-1.785 1.734-3.516 1.76-3.606-.039-.013-3.351-1.282-3.365-4.527v-.004zM14.996 4.092c.866-1.05 1.453-2.505 1.294-3.953-1.238.05-2.748.825-3.642 1.867-.803.927-1.48 2.413-1.294 3.83 1.385.108 2.775-.688 3.642-1.744z"/>
  </svg>
);

const testimonials = [
  { id: 1, text: "The fastest loan process I've ever experienced. Got the money in my account the same day!", author: "Priya Patel", role: "Verified Customer", rating: 5 },
  { id: 2, text: "Zero hidden fees and incredibly transparent. Helped me cover unexpected medical bills immediately.", author: "Rahul Sharma", role: "Verified Customer", rating: 4.5 },
  { id: 3, text: "I applied on Tuesday and had the funds by Thursday morning. Unbelievable service.", author: "Ananya Desai", role: "Verified Customer", rating: 4 },
  { id: 4, text: "The flexible terms allowed me to pay for my home renovation without stressing over monthly budgets.", author: "Vikram Singh", role: "Verified Customer", rating: 5 },
  { id: 5, text: "Paperless and painless. A breath of fresh air compared to traditional banks.", author: "Neha Gupta", role: "Verified Customer", rating: 4.5 },
  { id: 6, text: "I was worried about my credit score, but their process was exactly as advertised. Very smooth.", author: "Rohan Verma", role: "Verified Customer", rating: 4 },
  { id: 7, text: "Customer support was there every step of the way to answer my questions. 10/10 experience.", author: "Shruti Iyer", role: "Verified Customer", rating: 5 }
];

const loanTypes = [
  { name: 'Personal Loan', icon: User },
  { name: 'Home Loan', icon: Home },
  { name: 'Auto Loan', icon: Car },
  { name: 'Education Loan', icon: GraduationCap },
  { name: 'Medical Emergency', icon: HeartPulse },
  { name: 'Wedding Loan', icon: Gift },
  { name: 'Travel Loan', icon: Plane },
  { name: 'Debt Consolidation', icon: CreditCard },
  { name: 'Two-Wheeler Loan', icon: Bike },
  { name: 'Gold Loan', icon: Coins },
  { name: 'Consumer Durables', icon: Monitor },
];

const OffsetIcon = ({ Icon }: { Icon: any }) => (
  <div className="relative w-14 h-14 flex items-center justify-center mb-3">
    <div className="absolute top-1.5 right-1.5 w-8 h-8 bg-[#FB923C] rounded-full"></div>
    <Icon className="relative z-10 text-gray-900" size={32} strokeWidth={1.5} />
  </div>
);

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-white overflow-hidden">
      
      {/* Global Header */}
      <header className="h-[80px] shrink-0 border-b border-gray-100 flex items-center px-8 lg:px-12 bg-white relative z-20">
        <div className="flex items-center gap-2">
          <Logo className="text-[#EA580C]" />
          <span className="font-bold text-xl tracking-tight text-gray-900">Recur Club</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex overflow-hidden">
        
        {/* Left Panel */}
        <div className="hidden md:flex w-[480px] lg:w-[580px] xl:w-[720px] flex-col p-6 lg:p-10 relative flex-shrink-0 justify-between overflow-hidden">
          
          <div 
            className="w-full h-full rounded-[32px] relative overflow-hidden flex flex-col justify-end p-8 lg:p-10"
            style={{
              background: 'radial-gradient(ellipse at top right, #f97316 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, #9a3412 0%, transparent 55%), linear-gradient(135deg, #000000 0%, #000000 35%, #ea580c 100%)',
            }}
          >
            {/* Top Text */}
            <div className="absolute top-10 left-10 right-10">
              <h2 className="text-white text-[24px] lg:text-[28px] font-normal leading-snug tracking-wide text-white/95">
                <span className="block mb-1">Apply in minutes.</span>
                <span className="block font-bold">Get funds in your account within 48 hours.</span>
              </h2>
            </div>

            {/* Glassmorphic Testimonial Box */}
            <div className="relative z-10 w-full flex items-end gap-4 mt-12">
              
              <div className="flex-1 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[24px] p-6 lg:p-8 text-white shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white text-[18px] lg:text-[22px] font-medium leading-[1.4] mb-8">
                      "{testimonials[currentIndex].text}"
                    </p>
                    <div>
                      <div className="font-semibold text-white text-[16px]">{testimonials[currentIndex].author}</div>
                      <div className="text-white/80 text-[14px] mt-0.5">{testimonials[currentIndex].role}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-2 flex-shrink-0 flex-col sm:flex-row">
                <button 
                  onClick={prevTestimonial}
                  className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-colors shadow-lg"
                >
                  <ArrowLeft size={24} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-colors shadow-lg"
                >
                  <ArrowRight size={24} strokeWidth={1.5} />
                </button>
              </div>
              
            </div>
          </div>
          
        </div>
        
        {/* Right Panel (Form) */}
        <div className="flex-1 flex flex-col items-center p-8 lg:p-12 bg-[#F8F9FC] relative overflow-y-auto">
          
          <div className="w-full max-w-[640px] bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-[32px] font-bold tracking-tight text-gray-900 mb-2">Get started</h1>
              <p className="text-gray-500 text-[15px]">Takes less than 2 minutes. Secure & encrypted.</p>
            </div>
            
            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Full name (as per PAN)</label>
                  <input 
                    type="text" 
                    placeholder="Your full name" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:bg-white focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C] outline-none transition-all placeholder:text-gray-400 text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Email</label>
                  <input 
                    type="email" 
                    placeholder="you@company.com" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:bg-white focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C] outline-none transition-all placeholder:text-gray-400 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Phone number</label>
                  <div className="flex w-full rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-[#EA580C] focus-within:border-[#EA580C] overflow-hidden transition-all bg-[#F9FAFB] focus-within:bg-white">
                    <div className="flex items-center justify-center px-4 border-r border-gray-200 text-gray-500 font-medium bg-transparent">
                      +91
                    </div>
                    <input 
                      type="tel" 
                      placeholder="10-digit mobile number" 
                      className="w-full px-4 py-3 outline-none placeholder:text-gray-400 text-gray-900 bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Company name / PAN / GST</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search by company name, PAN or GST" 
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:bg-white focus:ring-2 focus:ring-[#EA580C] focus:border-[#EA580C] outline-none transition-all placeholder:text-gray-400 text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="flex items-center h-5 mt-0.5">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-[#EA580C] focus:ring-[#EA580C] cursor-pointer"
                  />
                </div>
                <div className="text-[13px] text-gray-600 leading-relaxed">
                  I authorize Recur Club & its lending partners to fetch my credit report. I agree to the <a href="#" className="text-[#EA580C] hover:underline font-medium">Terms of Service</a> & <a href="#" className="text-[#EA580C] hover:underline font-medium">Privacy Policy</a>.
                </div>
              </div>
              
              <div className="pt-2">
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#EA580C] text-white font-medium text-[16px] px-4 py-3.5 rounded-xl hover:bg-[#C2410C] transition-colors shadow-sm">
                  Get OTP
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-6 text-gray-400">
                <Lock className="w-4 h-4" />
                <span className="text-[13px] font-medium">256-bit bank-level encryption</span>
              </div>
            </form>
          </div>
          
          <button className="mt-6 mb-12 text-[15px] font-medium text-[#EA580C] hover:underline flex items-center gap-1.5 transition-colors">
            Track Application <ChevronRight className="w-4 h-4" />
          </button>
          
          <div className="w-full max-w-[640px] overflow-hidden relative">
            <h3 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">Types of loans we offer</h3>
            
            {/* Gradient masks for smooth fade on edges */}
            <div className="absolute left-0 top-16 bottom-0 w-8 bg-gradient-to-r from-[#F8F9FC] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-16 bottom-0 w-8 bg-gradient-to-l from-[#F8F9FC] to-transparent z-10 pointer-events-none"></div>
            
            <motion.div
              className="flex gap-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
              {[...loanTypes, ...loanTypes].map((loan, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group cursor-pointer shrink-0 w-[110px]">
                  <OffsetIcon Icon={loan.icon} />
                  <span className="text-[14px] font-medium text-gray-700 group-hover:text-[#EA580C] transition-colors leading-tight mt-1">{loan.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* Global Footer */}
      <footer className="h-[64px] shrink-0 border-t border-gray-100 flex items-center justify-between px-8 lg:px-12 bg-white text-[14px] text-gray-500 font-medium relative z-20">
        <div>&copy; 2026 Recur Club. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
