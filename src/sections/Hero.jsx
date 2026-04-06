import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

import ParticleSphere from '../components/ParticleSphere'
import StatsSection from '../components/StatsSection'

// Scene Component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <spotLight
        position={[-5, 5, 5]}
        angle={0.4}
        penumbra={1}
        intensity={2.2}
        color="#ffffff"
      />
      <pointLight position={[0, 0, 0]} intensity={1.8} color="#ffffff" />
      <pointLight position={[4, 4, 4]} intensity={1.0} color="#eeeeee" />
      <pointLight position={[-4, -4, -4]} intensity={0.6} color="#cccccc" />
      <ParticleSphere />
    </>
  )
}

const Hero = () => {
  const canvasRef = useRef()

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-transparent" />

      {/* White/Gray ambient blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-white/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', transform: 'translate(-50%, -50%)' }} />
      </div>

      {/* Diagonal Light Beam - From Top Left - Pure White */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[180%] bg-gradient-to-br from-white/20 via-white/5 to-transparent rotate-[35deg] blur-[120px]"
          style={{ transformOrigin: 'top left' }}
        />
        <div
          className="absolute top-[-5%] left-[-5%] w-[25%] h-[150%] bg-gradient-to-br from-white/10 via-white/2 to-transparent rotate-[35deg] blur-[60px]"
          style={{ transformOrigin: 'top left' }}
        />
        <div className="absolute top-[-40px] left-[-40px] w-48 h-48 bg-white/30 rounded-full blur-[60px]" />
        <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-white/50 rounded-full blur-[30px]" />
      </div>

      {/* ── BACKGROUND WATERMARK TEXT ── */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-0 overflow-hidden pt-20">
        <span
          className="select-none whitespace-nowrap font-normal uppercase"
          style={{
            fontSize: 'clamp(90px, 16vw, 220px)',
            color: 'rgba(255, 255, 255, 0.06)',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.04)',
            letterSpacing: '0.1em',
            userSelect: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: '400',
            lineHeight: '1.2',
            filter: 'blur(0.8px)'
          }}
        >
          CORTEX
        </span>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="relative w-full flex items-center justify-center min-h-screen">

          {/* Sphere - centered absolutely */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[560px] h-[560px]">
              <Canvas
                ref={canvasRef}
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ width: '100%', height: '100%' }}
                gl={{
                  alpha: true,
                  antialias: true,
                  powerPreference: "high-performance",
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 0.7
                }}
                performance={{ min: 0.5, max: 1 }}
                dpr={[1, 2]}
              >
                <Scene />
              </Canvas>
            </div>
          </div>

          {/* Text — centered overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 pointer-events-none max-w-2xl text-center"
          >
            <h1
              className="font-normal text-white leading-[1.2] tracking-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
            >
              Building{' '}
              <span className="italic font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                Digital
              </span>
              <br />
              <span className="italic font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                Solutions
              </span>{' '}
              That Matter
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-10 flex flex-col sm:flex-row gap-5 pointer-events-auto justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-9 py-3.5 bg-white text-black rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-all shadow-lg text-sm"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Work <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-9 py-3.5 bg-transparent border border-white/30 text-white rounded-full font-medium transition-all backdrop-blur-sm text-sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-4 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Stats Cards Section - Bottom Right */}
      <StatsSection />
    </section>
  )
}

export default Hero
