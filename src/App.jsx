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
  Sun,
  Moon,
  ChevronUp,
  MapPin,
  Phone,
  User,
  Lock,
  Flame,
  Snowflake,
  Leaf,
} from "lucide-react"

import bikramimg from "./image/bikram.jpg"

// Import CSS files
import "./styles/components.css"
import "./styles/layout.css"
import "./styles/animations.css"
import "./styles/themes.css"

// Simple Button component
const Button = ({ children, onClick, className = "", variant = "default", size = "default", ...props }) => {
  return (
    <button className={`btn btn-${variant} btn-${size} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

// Simple Card components
const Card = ({ children, className = "", ...props }) => (
  <div className={`card ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`card-content ${className}`} {...props}>
    {children}
  </div>
)

// Simple Badge component
const Badge = ({ children, className = "", variant = "default", ...props }) => {
  return (
    <div className={`badge badge-${variant} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState("light") // light, dark, fire, snow, jungle
  const [isLoading, setIsLoading] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Theme cycling function
  const cycleTheme = () => {
    const themes = ["light", "dark", "fire", "snow", "jungle"]
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Get theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5 theme-icon" />
      case "dark":
        return <Moon className="h-5 w-5 theme-icon" />
      case "fire":
        return <Flame className="h-5 w-5 theme-icon" />
      case "snow":
        return <Snowflake className="h-5 w-5 theme-icon" />
      case "jungle":
        return <Leaf className="h-5 w-5 theme-icon" />
      default:
        return <Sun className="h-5 w-5 theme-icon" />
    }
  }

  useEffect(() => {
    // Loading screen
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Scroll handler
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)

      const sections = ["home", "about", "skills", "projects", "experience", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
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
      github: "https://github.com/BIKRAM-DEBNATH", // 🔗 UPDATE: Add your actual GitHub repo link here
      live: "https://your-employee-management.vercel.app", // 🔗 UPDATE: Add your actual live demo link here
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
      id: 2,
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
      github: "https://github.com/BIKRAM-DEBNATH/Weather-Appliction", // 🔗 UPDATE: Add your actual GitHub repo link here
      live: "https://your-weather-app.vercel.app", // 🔗 UPDATE: Add your actual live demo link here
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
    return (
      <div className={`loading-screen theme-${theme}`}>
        <div className="loading-content">
          <div className="loading-logo">BD</div>
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`portfolio theme-${theme}`}>
      {/* Navigation */}
      <header className="header">
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-brand">
              <span className="brand-name">Bikram</span>
              <span className="brand-accent">Dev</span>
            </div>

            <div className="nav-menu">
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
              <button
                onClick={cycleTheme}
                className="theme-switcher"
                title={`Switch to ${
                  theme === "light"
                    ? "dark"
                    : theme === "dark"
                      ? "fire"
                      : theme === "fire"
                        ? "snow"
                        : theme === "snow"
                          ? "jungle"
                          : "light"
                } theme`}
              >
                {getThemeIcon()}
              </button>

              <button className="mobile-menu-btn btn btn-ghost btn-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
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
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-intro">
                <p className="hero-greeting">Hello, I'm</p>
                <h1 className="hero-name">Bikram Debnath</h1>
                <h2 className="hero-title">Aspiring Full Stack Developer</h2>
                <p className="hero-description">
                  A passionate student with hands-on experience in the MERN stack. I build responsive web applications
                  and solve real-world problems through code, constantly striving to grow as a developer.
                </p>
              </div>

              <div className="hero-actions">
                <Button onClick={() => scrollToSection("projects")} className="btn-primary">
                  <Code className="mr-2 h-4 w-4" />
                  View My Projects
                </Button>
                <Button variant="outline" onClick={() => scrollToSection("contact")}>
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </Button>
              </div>

              <div className="hero-social">
                {/* 🔗 UPDATE: Replace with your actual social media links */}
                <a
                  href="https://github.com/BIKRAM-DEBNATH"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-link"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bikram-debnath-90110a34b"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-link"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/your-twitter-handle"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-link"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="hero-image">
              <div className="profile-container">
                {/* 🖼️ UPDATE: Replace with your actual profile image */}
                <img
                  src={bikramimg || "/placeholder.svg"}
                  alt="Bikram Debnath - BCA Student & Developer"
                  className="profile-image"
                />
                <div className="profile-overlay"></div>

                {/* Floating Tech Icons */}
                <div className="tech-icon tech-icon-1">⚛️</div>
                <div className="tech-icon tech-icon-2">🟢</div>
                <div className="tech-icon tech-icon-3">🍃</div>
                <div className="tech-icon tech-icon-4">⚡</div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Get to know me better</p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <h3 className="about-heading">Passionate BCA Student & Developer</h3>
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
                <div className="stat-item">
                  <h4 className="stat-number">5+</h4>
                  <p className="stat-label">Projects Built</p>
                </div>
                <div className="stat-item">
                  <h4 className="stat-number">10+</h4>
                  <p className="stat-label">Technologies</p>
                </div>
              </div>
            </div>

            <div className="about-image">
              {/* 🖼️ UPDATE: Replace with your actual about image */}
              <img
                src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="About Bikram"
                className="about-img"
              />
              <div className="about-img-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Technical Skills</h2>
            <p className="section-subtitle">Technologies I work with</p>
          </div>

          <div className="skills-grid">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="skill-card">
                <CardContent>
                  <h3 className="skill-category">
                    {category === "frontend" && "🎨 Frontend"}
                    {category === "backend" && "⚙️ Backend"}
                    {category === "database" && "🗄️ Database"}
                    {category === "tools" && "🛠️ Tools"}
                    {category === "programming" && "💻 Programming"}
                  </h3>
                  <div className="skill-list">
                    {skillList.map((skill) => (
                      <div key={skill.name} className="skill-item">
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Some of my recent work</p>
          </div>

          <div className="project-filters">
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
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="project-card">
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
                <CardContent>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-features">
                    <h4 className="features-title">Key Features:</h4>
                    <ul className="features-list">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="feature-item">
                          <span className="feature-bullet">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Login Credentials Section */}
                  {project.loginCredentials && (
                    <div className="login-credentials">
                      <h4 className="credentials-title">Demo Login Credentials:</h4>
                      <div className="credentials-list">
                        <div className="credential-item admin">
                          <div className="credential-header">
                            <User className="h-4 w-4" />
                            <div className="credential-type">Admin Login:</div>
                          </div>
                          <div className="credential-info">
                            Email: <code>{project.loginCredentials.admin.email}</code>
                          </div>
                          <div className="credential-info">
                            Password: <code>{project.loginCredentials.admin.password}</code>
                          </div>
                        </div>
                        <div className="credential-item employee">
                          <div className="credential-header">
                            <Lock className="h-4 w-4" />
                            <div className="credential-type">Employee Login:</div>
                          </div>
                          <div className="credential-info">
                            Email: <code>{project.loginCredentials.employee.email}</code>
                          </div>
                          <div className="credential-info">
                            Password: <code>{project.loginCredentials.employee.password}</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="project-technologies">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="tech-badge">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience/Education Section */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Education & Learning Journey</h2>
            <p className="section-subtitle">My academic and self-learning path</p>
          </div>

          <div className="timeline">
            <div className="timeline-line"></div>

            <div className="timeline-items">
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
                    <li>• Strong focus on web development technologies</li>
                    <li>• Hands-on experience with MERN stack projects</li>
                    <li>• Self-motivated learning approach</li>
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
                    <li>• Built 5+ full-stack applications</li>
                    <li>• Experienced with deployment on Vercel and Railway</li>
                    <li>• Strong problem-solving skills in debugging and optimization</li>
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
                    <li>• Employee Management System with role-based auth</li>
                    <li>• Weather Application with API integration</li>
                    <li>• Version control with Git and GitHub</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Let's connect and discuss opportunities</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-intro">
                <h3 className="contact-heading">Let's Connect</h3>
                <p className="contact-text">
                  I'm actively seeking internship opportunities and would love to contribute to exciting projects.
                  Whether you have a question about my work or want to discuss potential collaborations, feel free to
                  reach out!
                </p>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="contact-detail">
                    <h4 className="contact-label">Email</h4>
                    {/* 📧 UPDATE: Replace with your actual email */}
                    <p className="contact-value">bikramdebnath905@gmail.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="contact-detail">
                    <h4 className="contact-label">Phone</h4>
                    {/* 📞 UPDATE: Replace with your actual phone number */}
                    <p className="contact-value">+91 6294920220</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="contact-detail">
                    <h4 className="contact-label">Location</h4>
                    {/* 📍 UPDATE: Replace with your actual location */}
                    <p className="contact-value">Kolkata, West Bengal, India</p>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                {/* 🔗 UPDATE: Replace with your actual social media links */}
                <a
                  href="https://github.com/BIKRAM-DEBNATH"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-btn"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bikram-debnath-90110a34b"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-btn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/your-twitter-handle"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-btn"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>

            <Card className="contact-form-card">
              <CardContent>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
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
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
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
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
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
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
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
                    <div className="form-success">✅ Message sent successfully! I'll get back to you soon.</div>
                  )}

                  {submitStatus === "error" && (
                    <div className="form-error">
                      ❌ Failed to send message. Please try again or contact me directly.
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="form-submit">
                    <Mail className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <p className="footer-copyright">&copy; 2024 Bikram Debnath. All rights reserved.</p>
              <p className="footer-credit">Designed & Built with ❤️ by Bikram Debnath</p>
            </div>
            <div className="footer-nav">
              <button onClick={() => scrollToSection("home")} className="footer-link">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="footer-link">
                About
              </button>
              <button onClick={() => scrollToSection("projects")} className="footer-link">
                Projects
              </button>
              <button onClick={() => scrollToSection("contact")} className="footer-link">
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button onClick={() => scrollToSection("home")} className="back-to-top" size="icon">
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
