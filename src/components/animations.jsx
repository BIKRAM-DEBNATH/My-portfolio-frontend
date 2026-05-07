import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const springConfig = { damping: 25, stiffness: 500 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      if (e.target.tagName === "A" || e.target.tagName === "BUTTON" || e.target.closest("a") || e.target.closest("button")) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY, isVisible])

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? "hovering" : ""}`}
      style={{
        translateX: smoothX,
        translateY: smoothY,
        left: 0,
        top: 0,
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 1.5 : 1 }}
    >
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </motion.div>
  )
}

const ParticlesBackground = ({ count = 100 }) => {
  const points = useRef()
  const countRef = useRef(count)
  const positionsRef = useRef(new Float32Array(countRef.current * 3))
  
  useEffect(() => {
    for (let i = 0; i < countRef.current; i++) {
      positionsRef.current[i * 3] = (Math.random() - 0.5) * 10
      positionsRef.current[i * 3 + 1] = (Math.random() - 0.5) * 10
      positionsRef.current[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
  }, [])

  useFrame(() => {
    if (!points.current) return
    
    const positionAttr = points.current.geometry.attributes.position
    for (let i = 0; i < countRef.current; i++) {
      positionAttr.array[i * 3] = positionsRef.current[i * 3] + Math.sin(Date.now() * 0.001 + i) * 0.02
      positionAttr.array[i * 3 + 1] = positionsRef.current[i * 3 + 1] + Math.cos(Date.now() * 0.001 + i) * 0.02
      positionAttr.array[i * 3 + 2] = positionsRef.current[i * 3 + 2]
    }
    positionAttr.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={countRef.current}
          array={positionsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export const ParticleHeroBackground = () => {
  return (
    <div className="hero-particles">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ParticlesBackground count={80} />
      </Canvas>
    </div>
  )
}

export const AnimatedGradientBackground = () => {
  return (
    <div className="animated-gradient-bg">
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
      <div className="grid-overlay" />
    </div>
  )
}

export const PremiumLoadingScreen = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Initializing...")
  
  useEffect(() => {
    const statuses = [
      "Initializing...",
      "Loading assets...",
      "Building UI...",
      "Applying effects...",
      "Almost ready...",
    ]
    
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        setTimeout(onComplete, 500)
      }
      setProgress(Math.min(currentProgress, 100))
      setStatus(statuses[Math.floor((currentProgress / 100) * statuses.length)])
    }, 200)
    
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="premium-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="loading-content">
            <motion.div
              className="loading-logo"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="logo-text">BD</span>
            </motion.div>
            
            <div className="loading-progress-bar">
              <motion.div
                className="loading-progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <motion.p
              className="loading-status"
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {status}
            </motion.p>
            
            <motion.span
              className="loading-percentage"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
          
          <div className="loading-scanner">
            <div className="scanner-line" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const FadeInView = ({ children, delay = 0, once = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const StaggerFadeIn = ({ children, delay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        visible: { transition: { staggerChildren: delay } },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  )
}

export const FadeInItem = ({ children }) => {
  return (
    <motion.div
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hidden: { opacity: 0, y: 30 },
      }}
    >
      {children}
    </motion.div>
  )
}

export const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="globe-icon">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

export const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const smoothRotateX = useSpring(rotateX, springConfig)
  const smoothRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateXValue = ((y - centerY) / centerY) * -10
    const rotateYValue = ((x - centerX) / centerX) * 10
    
    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export const GlowBorderCard = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`glow-border-card ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glow-border-inner">
        {children}
      </div>
    </motion.div>
  )
}

export const NavbarGlass = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <motion.header
      className={`navbar-glass ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.header>
  )
}

export const SectionReveal = ({ children }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  )
}

export const SkillBar = ({ name, level, icon }) => {
  return (
    <motion.div
      className="skill-item-animated"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="skill-header">
        <span className="skill-icon-animated">{icon}</span>
        <span className="skill-name">{name}</span>
        <span className="skill-percentage">{level}%</span>
      </div>
      <div className="skill-bar-animated">
        <motion.div
          className="skill-progress-animated"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

export const HeroTitle = ({ children }) => {
  const text = typeof children === "string" ? children : ""
  const chars = text.split("")
  
  return (
    <div className="hero-title-animated">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="char"
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

export const FloatingElement = ({ children, delay = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export const MagneticButton = ({ children, onClick, className = "" }) => {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`magnetic-button ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export const RippleButton = ({ children, onClick, className = "" }) => {
  const [ripples, setRipples] = useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newRipple = { id: Date.now(), x, y }
    setRipples([...ripples, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
    
    if (onClick) onClick(e)
  }

  return (
    <motion.button
      className={`ripple-button ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="ripple"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </motion.button>
  )
}