import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      let current = 'home'
      for (const link of links) {
        const el = document.getElementById(link.id)
        if (el && el.getBoundingClientRect().top <= 140) current = link.id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/80 shadow-sm shadow-emerald-900/5 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="relative mx-auto flex max-w-[1700px] items-center justify-between px-5 py-[clamp(0.5rem,1.8vh,1rem)] sm:px-8 lg:px-[6.5%]">
        {/* LOGO */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <Leaf
            size={42}
            strokeWidth={1.6}
            className="fill-[#0a9a4a]/90 text-[#0a9a4a]"
          />
          <span className="leading-none">
            <span className="block text-[28px] font-extrabold tracking-tight text-[#0b2e2c]">
              Plant<span className="text-[#0a9a4a]">Care</span>
            </span>
            <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">
              AI Diagnosis
            </span>
          </span>
        </Link>

        {/* CENTER PILL NAV */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 rounded-full border border-white/70 bg-white/75 px-10 py-[clamp(0.6rem,1.9vh,1.1rem)] shadow-[0_10px_30px_-10px_rgba(0,70,35,0.25)] backdrop-blur-xl md:flex">
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-base font-semibold transition-colors duration-300 hover:text-[#0a9a4a] ${
                  isActive ? 'text-[#0a9a4a]' : 'text-[#0b2e2c]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-[#0a9a4a] transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            )
          })}
        </div>

        {/* RIGHT BUTTONS */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="rounded-full border border-white/70 bg-white/75 px-7 py-[clamp(0.5rem,1.5vh,0.875rem)] text-base font-semibold text-[#0b2e2c] shadow-sm backdrop-blur-md transition hover:bg-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="group flex items-center gap-2.5 rounded-full bg-[#0a9a4a] px-7 py-[clamp(0.5rem,1.5vh,0.875rem)] text-base font-semibold text-white! shadow-[0_10px_24px_-8px_rgba(10,154,74,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#088541]"
          >
            Get Started
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2 text-slate-800 transition hover:bg-emerald-50 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-emerald-100 px-5 py-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              {link.label}
            </a>
          ))}

          <Link
            to="/login"
            onClick={closeMenu}
            className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={closeMenu}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0a9a4a] px-4 py-3 font-bold text-white! transition hover:bg-[#088541]"
          >
            Get Started <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar



