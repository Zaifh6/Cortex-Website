import { useEffect } from 'react'
import Lenis from 'lenis'

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => {
        // Optimized easing function for smoother scrolling
        return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
      },
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: true,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: true,
    })

    // ✅ About.jsx scroll lock ke liye expose karo
    window.__lenis = lenis

    let raf = null

    function onScroll(e) {
      // Animation frame callback for smooth scrolling
    }

    lenis.on('scroll', onScroll)

    function animate(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    // Throttle resize events
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        lenis.resize()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.removeEventListener('resize', handleResize)
      window.__lenis = null
    }
  }, [])
}

export default useLenis