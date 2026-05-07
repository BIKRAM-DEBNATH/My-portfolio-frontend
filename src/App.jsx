"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  Code,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Menu,
  X,
  MapPin,
  Phone,
  User,
  Lock,
  ChevronUp,
  Sun,
  Moon,
  Flame,
  Snowflake,
  Leaf,
} from "lucide-react"

import bikramimg from "./image/bikram.jpg"
import interviewImg from "./image/ChatGPT Image May 7, 2026, 10_07_07 PM.png"

import "./styles/futuristic-theme.css"
import "./styles/components.css"
import "./styles/layout.css"
import "./styles/themes.css"

import {
  FuturisticCursor,
  FuturisticParticles,
  FuturisticBackground,
  CinematicLoadingScreen,
  FadeInSection,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  FloatingIcon,
  ScrollReveal,
} from "./components/futuristic-components"

const FuturisticButton = ({ children, onClick, className = "", variant = "primary", ...props }) => {
  return (
    <button
      className={`futuristic-btn futuristic-btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "", ...props }) => (
  <div className={`glass-card ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
)

const Badge = ({ children, className = "", ...props }) => (
  <span className={`tech-badge ${className}`} {...props}>
    {children}
  </span>
)

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState("Initializing AI Core...")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [theme, setTheme] = useState("futuristic")

  const cycleTheme = () => {
    const themes = ["futuristic", "light", "dark", "fire", "snow", "jungle"]
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light": return <Sun className="h-5 w-5" />
      case "dark": return <Moon className="h-5 w-5" />
      case "fire": return <Flame className="h-5 w-5" />
      case "snow": return <Snowflake className="h-5 w-5" />
      case "jungle": return <Leaf className="h-5 w-5" />
      default: return <Sun className="h-5 w-5" />
    }
  }

  useEffect(() => {
    const loadingMessages = [
      "Initializing AI Core...",
      "Loading Developer Profile...",
      "Building Interface...",
      "Calibrating Systems...",
      "Access Granted"
    ]
    
    let currentProgress = 0
    const loadingInterval = setInterval(() => {
      currentProgress += Math.random() * 12
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(loadingInterval)
        setTimeout(() => {
          setIsLoading(false)
        }, 800)
      }
      setProgress(Math.min(currentProgress, 100))
      
      const msgIndex = Math.floor((currentProgress / 100) * loadingMessages.length)
      setStatusMessage(loadingMessages[Math.min(msgIndex, loadingMessages.length - 1)])
    }, 400)

    return () => clearInterval(loadingInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)

      const sections = ["home", "about", "skills", "projects", "experience", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const projects = [
    {
      id: 1,
      title: "AI-Based Interview Platform",
      description:
        "An intelligent interview preparation app using AI to generate personalized questions, provide real-time feedback, and simulate mock interviews with voice recognition.",
      image: interviewImg,
      category: "web",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "OpenAI API", "Web Speech API"],
      features: [
        "AI-generated personalized interview questions",
        "Real-time speech recognition",
        "Mock interview simulations",
        "Performance analytics & feedback",
        "Resume analysis with AI suggestions",
      ],
      github: "https://github.com/BIKRAM-DEBNATH",
      live: "https://your-ai-interview.vercel.app",
      loginCredentials: {
        admin: {
          email: "admin@aiinterview.com",
          password: "admin123",
        },
      },
    },
    {
      id: 2,
      title: "Task Management System",
      description:
        "A comprehensive task management application with team collaboration, drag-drop kanban boards, priority levels, and deadline tracking.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "web",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
      features: [
        "Drag-and-drop kanban boards",
        "Team collaboration",
        "Priority & deadline management",
        "Real-time notifications",
        "Task history & progress tracking",
      ],
      github: "https://github.com/BIKRAM-DEBNATH/taskmanager",
      live: "https://taskmanager-eight-flame-52.vercel.app/login",
    },
    {
      id: 3,
      title: "Athletics Registration System",
      description:
        "A sports event management portal for athlete registrations, event scheduling, results tracking, and admin management.",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "web",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      features: [
        "Athlete registration portal",
        "Event scheduling & management",
        "Results publication",
        "Category-wise competitions",
        "Admin dashboard & reports",
      ],
      github: "https://github.com/BIKRAM-DEBNATH/clubsport",
      live: "https://clubsport-olop.vercel.app",
      loginCredentials: {
        admin: {
          email: "admin@sports.com",
          password: "Admin@123",
        },
      },
    },
    {
      id: 4,
      title: "Employee Management System",
      description:
        "A full-stack MERN application for office task tracking and leave management with role-based authentication.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "web",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      features: [
        "Admin & Employee login system",
        "Task assignment and progress tracking",
        "Leave management (Apply, Approve, Reject)",
        "Role-based protected routes",
        "Report generation with export",
      ],
      github: "https://github.com/BIKRAM-DEBNATH",
      live: "https://your-employee-management.vercel.app",
      loginCredentials: {
        admin: {
          email: "admin@example.com",
          password: "admin123",
        },
        employee: {
          email: "employee@example.com",
          password: "employee123",
        },
      },
    },
    {
      id: 5,
      title: "Weather Application",
      description:
        "Real-time weather forecast app with geolocation, city search, and favorites management using open APIs.",
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "web",
      technologies: ["JavaScript", "HTML5", "CSS3", "Weather API", "Geo API"],
      features: [
        "Current weather by city",
        "Geo API autocomplete",
        "Temperature unit toggle",
        "Favorite cities management",
        "LocalStorage synchronization",
      ],
      github: "https://github.com/BIKRAM-DEBNATH/Weather-Appliction",
      live: "https://your-weather-app.vercel.app",
    },
  ]

  const skills = {
    frontend: [
      { name: "HTML5", level: 90, icon: "🌐" },
      { name: "CSS3", level: 85, icon: "🎨" },
      { name: "JavaScript", level: 88, icon: "⚡" },
      { name: "React.js", level: 85, icon: "⚛️" },
      { name: "Context API", level: 80, icon: "🔄" },
    ],
    backend: [
      { name: "Node.js", level: 82, icon: "🟢" },
      { name: "Express.js", level: 80, icon: "🚀" },
      { name: "RESTful APIs", level: 85, icon: "🔗" },
      { name: "JWT", level: 78, icon: "🔐" },
    ],
    database: [
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "MySQL", level: 75, icon: "🐬" },
      { name: "Mongoose", level: 75, icon: "📊" },
    ],
    tools: [
      { name: "Git & GitHub", level: 85, icon: "📚" },
      { name: "VS Code", level: 90, icon: "💻" },
      { name: "Postman", level: 80, icon: "📮" },
      { name: "Vercel", level: 75, icon: "▲" },
    ],
    programming: [
      { name: "Java", level: 85, icon: "☕" },
      { name: "Python", level: 40, icon: "🐍" },
      { name: "C Programming", level: 80, icon: "⚙️" },
      { name: "PHP", level: 55, icon: "🐘" },
    ],
  }

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <CinematicLoadingScreen progress={progress} statusMessage={statusMessage} />
  }

  return (
    <div className={`theme-futuristic theme-${theme}`}>
      {theme === "futuristic" && (
        <>
          <FuturisticBackground />
          <FuturisticParticles />
          <FuturisticCursor />
        </>
      )}

      <header className="futuristic-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="nav-brand-text">Bikram</span>
            <span className="nav-brand-accent">.dev</span>
          </div>

          <div className="nav-links">
            {["home", "about", "skills", "projects", "experience", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link ${activeSection === section ? "active" : ""}`}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button onClick={cycleTheme} className="theme-switcher futuristic-btn futuristic-btn-outline" title={`Switch to next theme`}>
              {getThemeIcon()}
            </button>
            <button className="mobile-menu-btn futuristic-btn futuristic-btn-outline" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {["home", "about", "skills", "projects", "experience", "contact"].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)} className="mobile-menu-link">
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="home" className="futuristic-hero">
        <div className="hero-content">
          <div className="hero-text">
            <FadeInSection>
              <div className="hero-greeting">Hello, I am</div>
              <h1 className="hero-name glitch-hover">Bikram Debnath</h1>
              <h2 className="hero-title">Aspiring Full Stack Developer</h2>
              <p className="hero-description">
                A passionate student with hands-on experience in the MERN stack. I build responsive web applications
                and solve real-world problems through code, constantly striving to grow as a developer.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="hero-actions">
                <FuturisticButton variant="primary" onClick={() => scrollToSection("projects")}>
                  <Code className="h-4 w-4" />
                  View My Projects
                </FuturisticButton>
                <FuturisticButton variant="outline" onClick={() => scrollToSection("contact")}>
                  <Mail className="h-4 w-4" />
                  Get In Touch
                </FuturisticButton>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="hero-social">
                <a href="https://github.com/BIKRAM-DEBNATH" target="_blank" rel="noreferrer noopener" className="social-btn">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/bikram-debnath-90110a34b" target="_blank" rel="noreferrer noopener" className="social-btn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noreferrer noopener" className="social-btn">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </FadeInSection>
          </div>

          <FadeInSection delay={0.4}>
            <div className="hero-image-container">
              <div className="hero-profile-frame">
                <div className="hero-profile-ring" />
                <div className="hero-profile-ring-inner" />
                <img src={bikramimg || "/placeholder.svg"} alt="Bikram Debnath" className="hero-profile-img" />
                <FloatingIcon delay={0} className="floating-icon" style={{ top: "10%", right: "-20px" }}>⚛️</FloatingIcon>
                <FloatingIcon delay={1} className="floating-icon" style={{ bottom: "10%", left: "-20px" }}>🟢</FloatingIcon>
                <FloatingIcon delay={2} className="floating-icon" style={{ top: "50%", right: "-30px" }}>🍃</FloatingIcon>
                <FloatingIcon delay={0.5} className="floating-icon" style={{ top: "30%", left: "-30px" }}>⚡</FloatingIcon>
              </div>
            </div>
          </FadeInSection>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <ChevronDown className="h-5 w-5" />
        </div>
      </section>

      <section id="about" className="futuristic-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <div className="section-label">Get to know me</div>
              <h2 className="section-title">About Me</h2>
              <p className="section-subtitle">Passionate BCA Student & Developer</p>
            </div>
          </ScrollReveal>

          <div className="about-content">
            <ScrollReveal>
              <div className="about-text">
                <p className="about-paragraph">
                  I'm Bikram Debnath, a passionate and dedicated BCA student with a strong foundation in full-stack web
                  development. I specialize in the MERN stack — MongoDB, Express, React, and Node.js — and enjoy building
                  modern, user-centric web applications that solve real-world problems.
                </p>
                <p className="about-paragraph">
                  My journey in development has been driven by curiosity, consistency, and a commitment to learning. I'm
                  experienced in creating responsive interfaces, developing secure backend systems, integrating APIs,
                  managing state efficiently, and deploying full-stack applications to the web.
                </p>
                <p className="about-paragraph">
                  Currently, I'm seeking internship or entry-level opportunities where I can contribute meaningfully to a
                  development team, grow under mentorship, and continue evolving as a full-stack developer.
                </p>

                <div className="about-stats">
                  <div className="stat-card">
                    <div className="stat-number">10+</div>
                    <div className="stat-label">Projects Built</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">10+</div>
                    <div className="stat-label">Technologies</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="skills" className="futuristic-section futuristic-section-alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <div className="section-label">My Expertise</div>
              <h2 className="section-title">Technical Skills</h2>
              <p className="section-subtitle">Technologies I work with</p>
            </div>
          </ScrollReveal>

          <StaggerContainer delay={0.1}>
            <div className="skills-grid">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="skill-card">
                  <h3 className="skill-category">
                    {category === "frontend" && "🎨 Frontend"}
                    {category === "backend" && "⚙️ Backend"}
                    {category === "database" && "🗄️ Database"}
                    {category === "tools" && "🛠️ Tools"}
                    {category === "programming" && "💻 Programming"}
                  </h3>
                  <div className="skill-list">
                    {skillList.map((skill) => (
                      <StaggerItem key={skill.name}>
                        <div className="skill-item">
                          <div className="skill-header">
                            <span className="skill-name">
                              <span className="skill-icon">{skill.icon}</span>
                              {skill.name}
                            </span>
                            <span className="skill-percentage">{skill.level}%</span>
                          </div>
                          <div className="skill-bar">
                            <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section id="projects" className="futuristic-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <div className="section-label">My Work</div>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">Some of my recent work</p>
            </div>
          </ScrollReveal>

          <div className="filter-buttons">
            {["all", "web", "mobile", "api"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <StaggerContainer delay={0.1}>
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <TiltCard key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-img" />
                    <div className="project-overlay">
                      <a href={project.live} target="_blank" rel="noreferrer noopener" className="project-link">
                        <ExternalLink className="h-5 w-5" />
                      </a>
                      <a href={project.github} target="_blank" rel="noreferrer noopener" className="project-link">
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <CardContent className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>

                    <div className="project-features">
                      <h4 className="features-title">Key Features:</h4>
                      <ul className="features-list">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="feature-item">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.loginCredentials && (
                      <div className="login-credentials">
                        <h4 className="credentials-title">Demo Login Credentials:</h4>
                        <div className="credentials-list">
                          <div className="credential-item">
                            <div className="credential-header">
                              <User className="h-4 w-4" />
                              Admin Login
                            </div>
                            <div className="credential-info">
                              Email: <code>{project.loginCredentials.admin?.email}</code>
                            </div>
                            <div className="credential-info">
                              Password: <code>{project.loginCredentials.admin?.password}</code>
                            </div>
                          </div>
                          {(project.loginCredentials.employee || project.loginCredentials.athlete) && (
                            <div className="credential-item">
                              <div className="credential-header">
                                <Lock className="h-4 w-4" />
                                {project.loginCredentials.athlete ? "Athlete" : "Employee"} Login
                              </div>
                              <div className="credential-info">
                                Email: <code>{project.loginCredentials.employee?.email || project.loginCredentials.athlete?.email}</code>
                              </div>
                              <div className="credential-info">
                                Password: <code>{project.loginCredentials.employee?.password || project.loginCredentials.athlete?.password}</code>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="project-technologies">
                      {project.technologies.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </TiltCard>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section id="experience" className="futuristic-section futuristic-section-alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <div className="section-label">My Journey</div>
              <h2 className="section-title">Education & Learning</h2>
              <p className="section-subtitle">My academic and self-learning path</p>
            </div>
          </ScrollReveal>

          <StaggerContainer delay={0.2}>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Bachelor of Computer Applications (BCA)</h3>
                  <h4 className="timeline-subtitle">Currently Pursuing</h4>
                  <span className="timeline-date">2023 - Present</span>
                  <p className="timeline-description">
                    Developing strong foundational knowledge in computer science, programming, and web development.
                    Actively working on practical projects to apply theoretical concepts.
                  </p>
                  <ul className="timeline-list">
                    <li>Strong focus on web development technologies</li>
                    <li>Hands-on experience with MERN stack projects</li>
                    <li>Self-motivated learning approach</li>
                  </ul>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Self-Taught Full Stack Development</h3>
                  <h4 className="timeline-subtitle">Continuous Learning</h4>
                  <span className="timeline-date">2022 - Present</span>
                  <p className="timeline-description">
                    Dedicated to learning modern web development through online resources, documentation, and building
                    real-world projects. Focus on MERN stack and deployment practices.
                  </p>
                  <ul className="timeline-list">
                    <li>Built 5+ full-stack applications</li>
                    <li>Experienced with deployment on Vercel and Railway</li>
                    <li>Strong problem-solving skills</li>
                  </ul>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Project-Based Learning</h3>
                  <h4 className="timeline-subtitle">Practical Experience</h4>
                  <span className="timeline-date">2023 - Present</span>
                  <p className="timeline-description">
                    Focused on building real-world applications to solve practical problems. Each project teaches new
                    concepts and improves technical skills.
                  </p>
                  <ul className="timeline-list">
                    <li>Employee Management System with role-based auth</li>
                    <li>Weather Application with API integration</li>
                    <li>Version control with Git and GitHub</li>
                  </ul>
                </div>
              </div>
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section id="contact" className="futuristic-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <div className="section-label">Contact</div>
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">Let's connect and discuss opportunities</p>
            </div>
          </ScrollReveal>

          <div className="contact-content">
            <ScrollReveal>
              <div className="contact-info">
                <div className="contact-heading">Let's Connect</div>
                <p className="contact-text">
                  I'm actively seeking internship opportunities and would love to contribute to exciting projects.
                  Whether you have a question about my work or want to discuss potential collaborations, feel free to
                  reach out!
                </p>

                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="contact-label">Email</div>
                      <div className="contact-value">bikramdebnath905@gmail.com</div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="contact-label">Phone</div>
                      <div className="contact-value">+91 6294920220</div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="contact-label">Location</div>
                      <div className="contact-value">Kolkata, West Bengal, India</div>
                    </div>
                  </div>
                </div>

                <div className="contact-social">
                  <a href="https://github.com/BIKRAM-DEBNATH" target="_blank" rel="noreferrer noopener" className="social-btn">
                    <Github className="h-6 w-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/bikram-debnath-90110a34b" target="_blank" rel="noreferrer noopener" className="social-btn">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noreferrer noopener" className="social-btn">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="contact-form-card">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="form-textarea"
                    ></textarea>
                  </div>

                  {submitStatus === "success" && (
                    <div className="form-success">Message sent successfully! I'll get back to you soon.</div>
                  )}

                  {submitStatus === "error" && (
                    <div className="form-error">
                      Failed to send message. Please try again or contact me directly.
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="form-submit">
                    <Mail className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <footer className="futuristic-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p className="footer-copyright">&copy; 2024 Bikram Debnath. All rights reserved.</p>
            <p className="footer-credit">Designed & Built with passion by Bikram Debnath</p>
          </div>
          <div className="footer-nav">
            <button onClick={() => scrollToSection("home")} className="footer-link">Home</button>
            <button onClick={() => scrollToSection("about")} className="footer-link">About</button>
            <button onClick={() => scrollToSection("projects")} className="footer-link">Projects</button>
            <button onClick={() => scrollToSection("contact")} className="footer-link">Contact</button>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button className="back-to-top" onClick={() => scrollToSection("home")}>
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
