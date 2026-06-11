import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: 'Work Immersion Management System',
    description:
      'A web system for student immersion records, coordinator approvals, and report generation.',
    stack: 'PHP, Laravel, MySQL, Tailwind CSS',
  },
  {
    title: 'Attendance Monitoring System',
    description:
      'Role-based attendance tracking with logs, summaries, and dashboard analytics.',
    stack: 'PHP, Laravel, MySQL, Bootstrap',
  },
  {
    title: 'CRUD Dashboard Systems',
    description:
      'Admin dashboards with full CRUD workflows for managing records and reports.',
    stack: 'PHP, Laravel, MySQL, JavaScript',
  },
]

const skills = [
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
]

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/michaelallanbernardo',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/michael-allan-bernardo-7bbb55216/',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/michael_alln/',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg',
  },
]

function App() {
  const audioContextRef = useRef(null)
  const [bubbles, setBubbles] = useState(() =>
    Array.from({ length: 18 }, (_, index) => ({
      id: index + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 14 + Math.random() * 36,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * 4,
      opacity: 0.18 + Math.random() * 0.34,
      popped: false,
      hue: 170 + Math.random() * 35,
    }))
  )
  const [scrollY, setScrollY] = useState(0)
  const bubbleLayerRef = useRef(null)

  const playPopSound = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioCtx()
    }

    const ctx = audioContextRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(220, now)
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.08)

    filter.type = 'highpass'
    filter.frequency.setValueAtTime(180, now)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.11)
  }

  const popBubble = (id) => {
    playPopSound()
    setBubbles((prev) => prev.map((bubble) => (bubble.id === id ? { ...bubble, popped: true } : bubble)))

    setTimeout(() => {
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== id))
    }, 260)
  }

  const handleTitleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    event.currentTarget.style.setProperty('--mx', `${x}px`)
    event.currentTarget.style.setProperty('--my', `${y}px`)
  }

  const resetTitleGlow = (event) => {
    event.currentTarget.style.removeProperty('--mx')
    event.currentTarget.style.removeProperty('--my')
  }

  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal], [data-reveal-item]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (bubbleLayerRef.current) {
      bubbleLayerRef.current.style.transform = `translateY(-${scrollY * 0.4}px)`
    }
  }, [scrollY])

  return (
    <div className="page min-h-screen text-slate-100 selection:bg-teal-500/30">
      <div className="bubble-layer" ref={bubbleLayerRef} aria-hidden="true">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            type="button"
            className={`bubble ${bubble.popped ? 'bubble-pop' : ''}`}
            onClick={() => popBubble(bubble.id)}
            disabled={bubble.popped}
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              opacity: bubble.opacity,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
              '--bubble-hue': bubble.hue,
            }}
          />
        ))}
      </div>

      <main className="relative z-10">
        <section id="home" className="hero mx-auto max-w-6xl px-5 pb-20 pt-20 text-center md:px-8 md:pt-28 lg:px-10" data-reveal>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl md:leading-[1.03]" data-reveal-item>
            Michael Allan Bernardo
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-300" data-reveal-item>
            A web developer based in the Philippines, creating clean and reliable web solutions. Let&apos;s work together and bring your ideas to life.
          </p>

        </section>

        <section id="about" className="mx-auto max-w-6xl px-5 py-14 text-center md:px-8 md:py-16 lg:px-10" data-reveal>
          <h2
            className="section-title text-3xl font-semibold tracking-tight md:text-4xl"
            data-reveal-item
            onMouseMove={handleTitleMove}
            onMouseLeave={resetTitleGlow}
          >
            About Me
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed text-slate-300" data-reveal-item>
              I'm a passionate full-stack web developer with a strong foundation in creating robust and user-friendly web applications. With expertise in modern frameworks and databases, I specialize in building systems that solve real-world problems.
            </p>
            <p className="text-lg leading-relaxed text-slate-300" data-reveal-item>
              My journey in web development has equipped me with the skills to handle both frontend and backend challenges. I'm dedicated to writing clean, maintainable code and continuously learning new technologies to stay ahead in this ever-evolving field.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" data-reveal-item>
              <div className="rounded-lg border border-teal-300/20 bg-teal-400/5 p-4">
                <p className="text-2xl font-bold text-teal-300">3+</p>
                <p className="mt-1 text-sm text-slate-300">Projects Completed</p>
              </div>
              <div className="rounded-lg border border-teal-300/20 bg-teal-400/5 p-4">
                <p className="text-2xl font-bold text-teal-300">Full-Stack</p>
                <p className="mt-1 text-sm text-slate-300">Development Focus</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-5 py-14 text-center md:px-8 md:py-16 lg:px-10" data-reveal>
          <h2
            className="section-title text-3xl font-semibold tracking-tight md:text-4xl"
            data-reveal-item
            onMouseMove={handleTitleMove}
            onMouseLeave={resetTitleGlow}
          >
            Projects
          </h2>
          <div className="mx-auto mt-8 grid max-w-3xl gap-5">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="project-card rounded-2xl border border-white/10 bg-slate-900/70 p-6"
                style={{ animationDelay: `${index * 110}ms` }}
                data-reveal-item
              >
                <h3 className="text-xl font-semibold text-slate-100">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
                <p className="mt-4 text-sm font-semibold text-teal-300">{project.stack}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-5 py-14 text-center md:px-8 md:py-16 lg:px-10" data-reveal>
          <h2
            className="section-title text-3xl font-semibold tracking-tight md:text-4xl"
            data-reveal-item
            onMouseMove={handleTitleMove}
            onMouseLeave={resetTitleGlow}
          >
            Core Toolkit
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <span
                key={skill.name}
                className="skill-pill inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-200"
                style={{ animationDelay: `${index * 45}ms` }}
                data-reveal-item
              >
                <img src={skill.logo} alt={`${skill.name} logo`} className="h-4 w-4" loading="lazy" />
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 pb-20 pt-14 text-center md:px-8 lg:px-10" data-reveal>
          <h2
            className="section-title text-3xl font-semibold tracking-tight md:text-4xl"
            data-reveal-item
            onMouseMove={handleTitleMove}
            onMouseLeave={resetTitleGlow}
          >
            Let&apos;s Connect
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300" data-reveal-item>
            Got a project in mind or just want to connect? Feel free to reach out.
          </p>
          <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-4" data-reveal-item>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">Send an Email</p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=michaelallanbernardo@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-center text-sm text-teal-300 hover:text-teal-200"
            >
              michaelallanbernardo@gmail.com
            </a>
          </div>

          <div className="mx-auto mt-6 max-w-xl" data-reveal-item>
            <div className="flex items-center justify-center gap-4">
              <span className="social-divider h-px w-16 bg-amber-300/80"></span>
              <p className="social-title text-2xl font-semibold text-slate-100">Socials</p>
              <span className="social-divider h-px w-16 bg-amber-300/80"></span>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-5">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="contact-card flex h-12 w-12 items-center justify-center rounded-xl transition"
                  data-reveal-item
                >
                  <img src={item.logo} alt={`${item.label} logo`} className="h-7 w-7" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center">
        <p className="text-base text-slate-300">&copy; 2026 Michael Allan Bernardo</p>
      </footer>
    </div>
  )
}

export default App
