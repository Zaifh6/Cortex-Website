import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";

const teamMembers = [
  {
    name: "Michael Chen",
    title: "Senior Software Engineer, Cloud Infrastructure",
    description:
      "Leading our cloud infrastructure and automated deployment pipelines. Ensures that our scalable solutions can handle millions of events reliably.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=600&auto=format&fit=crop",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Jessica Roberts",
    title: "Lead Data Scientist",
    description:
      "Driving our AI and automation strategies. Jessica specializes in deep learning architectures and predictive modeling for business insights.",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "William Carter",
    title: "VP Product & Automation",
    description:
      "Bridging the gap between engineering and client needs. William ensures that every workflow we automate brings massive ROI to our clients.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
];

export function ProfileCardTestimonialCarousel({ className }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % teamMembers.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + teamMembers.length) % teamMembers.length
    );

  const currentMember = teamMembers[currentIndex];

  const socialIcons = [
    { icon: Github, url: currentMember.githubUrl, label: "GitHub" },
    { icon: Twitter, url: currentMember.twitterUrl, label: "Twitter" },
    { icon: Youtube, url: currentMember.youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: currentMember.linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop layout */}
      <div className='hidden md:flex relative items-center'>
        {/* Avatar */}
        <div className='w-[470px] h-[470px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-neutral-800 flex-shrink-0 relative border border-[#ffffff]/10'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentMember.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='w-full h-full'
            >
              <img
                src={currentMember.imageUrl}
                alt={currentMember.name}
                className='w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500'
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className='glass-card-stitch ghost-border-stitch ambient-glow-stitch rounded-3xl p-8 ml-[-80px] z-10 max-w-xl flex-1 bg-[#131313]/90 backdrop-blur-3xl border border-[#474747]/30'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentMember.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className='mb-6'>
                <h2 className='text-3xl font-bold text-white tracking-tight font-["Space_Grotesk"] mb-2'>
                  {currentMember.name}
                </h2>

                <p className='text-[0.6875rem] uppercase tracking-[0.2em] text-[#919191] font-["Space_Grotesk"]'>
                  {currentMember.title}
                </p>
              </div>

              <p className='text-[#c6c6c6] text-base leading-relaxed mb-8 font-["Manrope"]'>
                {currentMember.description}
              </p>

              <div className='flex space-x-4'>
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url || "#"}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center transition-all hover:bg-white/20 hover:scale-105 cursor-pointer text-[#e5e2e1]'
                    aria-label={label}
                  >
                    <IconComponent className='w-5 h-5' />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className='md:hidden max-w-sm mx-auto text-center bg-transparent mt-12'>
        {/* Avatar */}
        <div className='w-full aspect-square bg-[#1a1a1a] rounded-3xl overflow-hidden mb-6 border border-white/10'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentMember.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='w-full h-full'
            >
              <img
                src={currentMember.imageUrl}
                alt={currentMember.name}
                className='w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500'
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card content */}
        <div className='px-4 glass-card-stitch p-6 rounded-3xl border border-[#474747]/30 relative -mt-16 bg-[#131313]/90 backdrop-blur-xl mx-2'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentMember.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className='text-2xl font-bold text-white tracking-tight font-["Space_Grotesk"] mb-2'>
                {currentMember.name}
              </h2>
              
              <p className='text-[0.625rem] uppercase tracking-[0.2em] text-[#919191] font-["Space_Grotesk"] mb-6'>
                {currentMember.title}
              </p>
              
              <p className='text-[#c6c6c6] text-sm leading-relaxed mb-8'>
                {currentMember.description}
              </p>
              
              <div className='flex justify-center space-x-4'>
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url || "#"}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center transition-all hover:bg-white/20 cursor-pointer text-[#e5e2e1]'
                    aria-label={label}
                  >
                    <IconComponent className='w-5 h-5' />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className='flex justify-center items-center gap-6 mt-12'>
        {/* Previous */}
        <button
          onClick={handlePrevious}
          aria-label='Previous team member'
          className='w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#474747]/40 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer text-white'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>

        {/* Dots */}
        <div className='flex gap-3'>
          {teamMembers.map((_, memberIndex) => (
            <button
              key={memberIndex}
              onClick={() => setCurrentIndex(memberIndex)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                memberIndex === currentIndex
                  ? "bg-white w-6"
                  : "bg-[#474747] hover:bg-[#919191]"
              )}
              aria-label={`Go to team member ${memberIndex + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          aria-label='Next team member'
          className='w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#474747]/40 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer text-white'
        >
          <ChevronRight className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}
