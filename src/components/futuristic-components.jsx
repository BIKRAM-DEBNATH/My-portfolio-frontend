import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

export const FuturisticCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const springConfig = { damping: 25, stiffness: 500 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
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
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="futuristic-cursor"
      style={{
        translateX: smoothX,
        translateY: smoothY,
        left: 0,
        top: 0,
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <motion.div
        className={`cursor-glow ${isHovering ? "hovering" : ""}`}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="cursor-dot"
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

export const FuturisticParticles = () => {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let animationId
    const particles = []
    const particleCount = 80

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`
        ctx.fill()
      })
      
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  )
}

export const FuturisticBackground = () => {
  return (
    <div className="futuristic-bg">
      <div className="futuristic-grid" />
      <div className="holo-orb holo-orb-1" />
      <div className="holo-orb holo-orb-2" />
      <div className="holo-orb holo-orb-3" />
      <div className="scanlines" />
      <div className="noise-overlay" />
      <div className="light-beam" />
      <div className="light-beam" />
      <div className="light-beam" />
      <div className="light-beam" />
    </div>
  )
}

export const CinematicLoadingScreen = ({ progress, statusMessage }) => {
  return (
    <div className="cinematic-loading">
      <div className="futuristic-bg">
        <div className="futuristic-grid" />
        <div className="holo-orb holo-orb-1" />
        <div className="holo-orb holo-orb-2" />
      </div>
      
      <div className="loading-ring-container">
        <div className="loading-ring loading-ring-1" />
        <div className="loading-ring loading-ring-2" />
        <div className="loading-ring loading-ring-3" />
        <div className="loading-core">
          <div className="loading-core-inner" />
        </div>
        <div className="loading-pulse-ring" />
      </div>

      <div className="loading-hud">
        <div className="hud-frame hud-frame-tl" />
        <div className="hud-frame hud-frame-tr" />
        <div className="hud-frame hud-frame-bl" />
        <div className="hud-frame hud-frame-br" />
        <div className="hud-line-h hud-line-h-top" />
        <div className="hud-line-h hud-line-h-bottom" />
      </div>

      <div className="loading-content">
        <motion.h1
          className="loading-logo-text"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          BD
        </motion.h1>
        <p className="loading-subtitle">  Developer's Portfolio</p>

        <div className="loading-profile">
          <h2 className="loading-profile-name">Bikram Debnath</h2>
          <p className="loading-profile-role">Java & MERN Stack Developer</p>
          <div className="loading-profile-status">
            <span className="status-indicator" />
            <span>Building the future with code</span>
          </div>
        </div>

        <div className="loading-progress-container">
          <div className="loading-progress-track">
            <motion.div
              className="loading-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="loading-progress-text">
            <span className="loading-progress-percent">{Math.round(progress)}%</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={statusMessage}
            className="loading-status-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {statusMessage}
          </motion.div>
        </AnimatePresence>

        <div className="loading-system-msgs">
          <div className={`system-msg ${progress > 10 ? 'active' : ''}`}>Initializing AI Core</div>
          <div className={`system-msg ${progress > 40 ? 'active' : ''}`}>Loading Portfolio</div>
          <div className={`system-msg ${progress > 70 ? 'active' : ''}`}>Building Interface</div>
          <div className={`system-msg ${progress > 90 ? 'active' : ''}`}>Access Granted</div>
        </div>
      </div>
    </div>
  )
}

export const FadeInSection = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const StaggerContainer = ({ children, delay = 0.1 }) => {
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

export const StaggerItem = ({ children }) => {
  return (
    <motion.div
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        hidden: { opacity: 0, y: 40 },
      }}
    >
      {children}
    </motion.div>
  )
}

export const GlassCard = ({ children, className = "", onMouseMove, onMouseLeave }) => {
  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
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
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

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
    const rotateXValue = ((y - centerY) / centerY) * -8
    const rotateYValue = ((x - centerX) / centerX) * 8
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
      className={className}
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

export const TypingText = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed])

  return <span>{displayText}<span className="typing-cursor">|</span></span>
}

export const GlitchText = ({ children, className = "" }) => {
  return (
    <motion.span
      className={`glitch-hover ${className}`}
      whileHover={{
        x: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.span>
  )
}

export const FloatingIcon = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-10, 10, -10],
        rotate: [0, 5, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export const ScrollReveal = ({ children, threshold = 0.1 }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={`reveal-up ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  )
}

export const SkillBar = ({ name, level, icon }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="skill-item">
      <div className="skill-header">
        <span className="skill-name">
          <span className="skill-icon">{icon}</span>
          {name}
        </span>
        <span className="skill-percentage">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-progress"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${level}%` : 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
