import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, ArrowRight, User, Search, ChevronRight, Lock, Home, Car,
  GraduationCap, HeartPulse, Gift, Plane, CreditCard, Bike, Coins, Monitor,
  type LucideIcon,
} from 'lucide-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { radius, shadow, surface } from './theme';

const Logo = ({ className = '' }: { className?: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 17L17 7M7 23L23 7M13 25L25 13" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const testimonials = [
  { id: 1, text: "The fastest loan process I've ever experienced. Got the money in my account the same day!", author: 'Priya Patel', role: 'Verified Customer', rating: 5 },
  { id: 2, text: 'Zero hidden fees and incredibly transparent. Helped me cover unexpected medical bills immediately.', author: 'Rahul Sharma', role: 'Verified Customer', rating: 4.5 },
  { id: 3, text: 'I applied on Tuesday and had the funds by Thursday morning. Unbelievable service.', author: 'Ananya Desai', role: 'Verified Customer', rating: 4 },
  { id: 4, text: 'The flexible terms allowed me to pay for my home renovation without stressing over monthly budgets.', author: 'Vikram Singh', role: 'Verified Customer', rating: 5 },
  { id: 5, text: 'Paperless and painless. A breath of fresh air compared to traditional banks.', author: 'Neha Gupta', role: 'Verified Customer', rating: 4.5 },
  { id: 6, text: 'I was worried about my credit score, but their process was exactly as advertised. Very smooth.', author: 'Rohan Verma', role: 'Verified Customer', rating: 4 },
  { id: 7, text: 'Customer support was there every step of the way to answer my questions. 10/10 experience.', author: 'Shruti Iyer', role: 'Verified Customer', rating: 5 },
];

const loanTypes: { name: string; icon: LucideIcon }[] = [
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

const OffsetIcon = ({ Icon }: { Icon: LucideIcon }) => (
  <Box sx={{ position: 'relative', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
    <Box sx={{ position: 'absolute', top: 6, right: 6, width: 32, height: 32, bgcolor: 'primary.light', borderRadius: '50%' }} />
    <Icon style={{ position: 'relative', zIndex: 10 }} size={32} strokeWidth={1.5} color="#101828" />
  </Box>
);

/** Shared styling for the four form fields. */
const fieldSx = { width: '100%' } as const;

const labelSx = {
  display: 'block',
  fontSize: 14,
  fontWeight: 500,
  color: 'grey.700',
  mb: '6px',
} as const;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#FFFFFF', overflow: 'hidden' }}>

      {/* Global Header */}
      <Box component="header" sx={{ height: 80, flexShrink: 0, borderBottom: 1, borderColor: 'grey.100', display: 'flex', alignItems: 'center', px: { xs: 4, lg: 6 }, bgcolor: '#FFFFFF', position: 'relative', zIndex: 20 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ color: 'primary.main', display: 'flex' }}><Logo /></Box>
          <Typography sx={{ fontWeight: 700, fontSize: 20, letterSpacing: '-0.025em', color: 'grey.900' }}>Recur Club</Typography>
        </Stack>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, width: '100%', display: 'flex', overflow: 'hidden' }}>

        {/*
          Left Panel.
          Originally `hidden md:flex w-[480px] lg:w-[580px] xl:w-[720px]`, which
          starved the form of width across the whole 768-1279px band (the phone
          field collapsed to 32px at 768px). Now: hidden below 1024px entirely,
          a restrained 380px on laptops, and the original 720px from 1280px up
          so wide desktops render exactly as before.
        */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            width: { lg: 380, xl: 720 },
            flexDirection: 'column',
            p: { xs: 3, lg: 5 },
            position: 'relative',
            flexShrink: 0,
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '100%', height: '100%', borderRadius: `${radius.panel}px`, position: 'relative',
              overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              p: { xs: 4, lg: 5 },
              background:
                'radial-gradient(ellipse at top right, #f97316 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, #9a3412 0%, transparent 55%), linear-gradient(135deg, #000000 0%, #000000 35%, #ea580c 100%)',
            }}
          >
            {/* Top Text */}
            <Box sx={{ position: 'absolute', top: 40, left: 40, right: 40 }}>
              <Typography variant="h2" component="h2" sx={{ color: 'rgba(255,255,255,0.95)', fontSize: { xs: 24, lg: 28 }, fontWeight: 400, lineHeight: 1.375, letterSpacing: '0.025em' }}>
                <Box component="span" sx={{ display: 'block', mb: 0.5 }}>Apply in minutes.</Box>
                <Box component="span" sx={{ display: 'block', fontWeight: 700 }}>Get funds in your account within 48 hours.</Box>
              </Typography>
            </Box>

            {/* Glassmorphic Testimonial Box */}
            <Box sx={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', alignItems: 'flex-end', gap: 2, mt: 6 }}>
              <Box
                sx={{
                  flex: 1, bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.3)', borderRadius: `${radius.card}px`,
                  p: { xs: 3, lg: 4 }, color: '#FFFFFF', boxShadow: shadow.lg,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography sx={{ color: '#FFFFFF', fontSize: { xs: 18, lg: 22 }, fontWeight: 500, lineHeight: 1.4, mb: 4 }}>
                      "{testimonials[currentIndex].text}"
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: 16 }}>{testimonials[currentIndex].author}</Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, mt: '2px' }}>{testimonials[currentIndex].role}</Typography>
                    </Box>
                  </motion.div>
                </AnimatePresence>
              </Box>

              {/* Navigation Arrows */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ flexShrink: 0 }}>
                {([['Previous testimonial', prevTestimonial, ArrowLeft], ['Next testimonial', nextTestimonial, ArrowRight]] as const).map(([label, onClick, Icon]) => (
                  <IconButton
                    key={label}
                    aria-label={label}
                    onClick={onClick}
                    disableRipple
                    sx={{
                      width: 56, height: 56, bgcolor: '#FFFFFF', borderRadius: `${radius.arrow}px`,
                      color: 'grey.900', boxShadow: shadow.lg,
                      '&:hover': { bgcolor: 'grey.50' },
                    }}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Right Panel (Form) */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: { xs: 4, lg: 6 }, bgcolor: surface.page, position: 'relative', overflowY: 'auto' }}>

          <Box sx={{ width: '100%', maxWidth: 640, bgcolor: '#FFFFFF', borderRadius: `${radius.card}px`, p: 4, boxShadow: shadow.sm, border: 1, borderColor: 'grey.100' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h1" component="h1" sx={{ color: 'grey.900', mb: 1 }}>Get started</Typography>
              <Typography sx={{ color: 'grey.500', fontSize: 15 }}>Takes less than 2 minutes. Secure &amp; encrypted.</Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={(e) => e.preventDefault()}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
                <Box>
                  <Typography component="label" htmlFor="full-name" sx={labelSx}>Full name (as per PAN)</Typography>
                  <OutlinedInput id="full-name" placeholder="Your full name" sx={fieldSx} />
                </Box>

                <Box>
                  <Typography component="label" htmlFor="email" sx={labelSx}>Email</Typography>
                  <OutlinedInput id="email" type="email" placeholder="you@company.com" sx={fieldSx} />
                </Box>

                <Box>
                  <Typography component="label" htmlFor="phone" sx={labelSx}>Phone number</Typography>
                  <OutlinedInput
                    id="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    sx={{ ...fieldSx, pl: 0, '& .MuiOutlinedInput-input': { pl: 2 } }}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{
                          // Stretch to the field's full inner height so the
                          // divider runs edge to edge, as the original
                          // bordered div did. Inset 1px to sit inside the
                          // outline rather than across it.
                          alignSelf: 'stretch', height: 'auto', maxHeight: 'none',
                          m: 0, my: '1px', ml: '1px', px: 2,
                          borderRight: 1, borderColor: 'grey.200',
                          '& .MuiTypography-root': { color: 'grey.500', fontWeight: 500 },
                        }}
                      >
                        +91
                      </InputAdornment>
                    }
                  />
                </Box>

                <Box>
                  <Typography component="label" htmlFor="company" sx={labelSx}>Company name / PAN / GST</Typography>
                  <OutlinedInput
                    id="company"
                    placeholder="Search by company name, PAN or GST"
                    sx={{ ...fieldSx, pl: '17px', '& .MuiOutlinedInput-input': { pl: 0 } }}
                    startAdornment={
                      <InputAdornment position="start" sx={{ mr: '7px' }}>
                        <Search size={20} color="#6A7282" />
                      </InputAdornment>
                    }
                  />
                </Box>
              </Box>

              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start', pt: 1, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: 20, mt: '2px' }}>
                  <Checkbox id="consent" size="small" slotProps={{ input: { 'aria-label': 'Authorize credit report fetch' } }} />
                </Box>
                <Typography component="label" htmlFor="consent" sx={{ fontSize: 13, color: 'grey.600', lineHeight: 1.625, cursor: 'pointer' }}>
                  I authorize Recur Club &amp; its lending partners to fetch my credit report. I agree to the{' '}
                  <Link href="#" sx={{ color: 'primary.dark' }}>Terms of Service</Link> &amp;{' '}
                  <Link href="#" sx={{ color: 'primary.dark' }}>Privacy Policy</Link>.
                </Typography>
              </Stack>

              <Box sx={{ pt: 1, mt: 3 }}>
                <Button type="submit" variant="contained" fullWidth endIcon={<ChevronRight size={20} />}>
                  Get OTP
                </Button>
              </Box>

              <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', justifyContent: 'center', mt: 3, color: 'grey.500' }}>
                <Lock size={16} />
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>256-bit bank-level encryption</Typography>
              </Stack>
            </Box>
          </Box>

          <Button
            variant="text"
            endIcon={<ChevronRight size={16} />}
            sx={{
              mt: 3, mb: 6, fontSize: 15, color: 'primary.dark',
              p: 0, minWidth: 0,
              '& .MuiButton-endIcon': { ml: '6px' },
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
            }}
          >
            Track Application
          </Button>

          <Box sx={{ width: '100%', maxWidth: 640, overflow: 'hidden', position: 'relative' }}>
            <Typography variant="h3" component="h3" sx={{ color: 'grey.900', mb: 4, borderBottom: 1, borderColor: 'grey.200', pb: 2 }}>
              Types of loans we offer
            </Typography>

            {/* Gradient masks for smooth fade on edges */}
            <Box sx={{ position: 'absolute', left: 0, top: 64, bottom: 0, width: 32, background: `linear-gradient(to right, ${surface.page}, transparent)`, zIndex: 10, pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', right: 0, top: 64, bottom: 0, width: 32, background: `linear-gradient(to left, ${surface.page}, transparent)`, zIndex: 10, pointerEvents: 'none' }} />

            <motion.div
              style={{ display: 'flex', gap: 40 }}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
            >
              {[...loanTypes, ...loanTypes].map((loan, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                    cursor: 'pointer', flexShrink: 0, width: 110,
                    '&:hover .loan-label': { color: 'primary.dark' },
                  }}
                >
                  <OffsetIcon Icon={loan.icon} />
                  <Typography className="loan-label" sx={{ fontSize: 14, fontWeight: 500, color: 'grey.700', lineHeight: 1.25, mt: 0.5, transition: 'color .15s' }}>
                    {loan.name}
                  </Typography>
                </Box>
              ))}
            </motion.div>
          </Box>

        </Box>
      </Box>

      {/* Global Footer */}
      <Box component="footer" sx={{ height: 64, flexShrink: 0, borderTop: 1, borderColor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 4, lg: 6 }, bgcolor: '#FFFFFF', fontSize: 14, color: 'grey.500', fontWeight: 500, position: 'relative', zIndex: 20 }}>
        <Box>&copy; 2026 Recur Club. All rights reserved.</Box>
        <Stack direction="row" spacing={3}>
          <Link href="#" sx={{ color: 'grey.500', '&:hover': { color: 'grey.900' } }}>Privacy Policy</Link>
          <Link href="#" sx={{ color: 'grey.500', '&:hover': { color: 'grey.900' } }}>Terms of Service</Link>
        </Stack>
      </Box>
    </Box>
  );
}
