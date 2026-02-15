import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Product', href: '#product' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'services', 'product', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex-shrink-0"
            data-testid="navbar-logo"
          >
            <div
              className="flex items-center justify-center border-2 border-[#FF5500] rounded-lg overflow-hidden"
              style={{ width: '80px', height: '70px' }}
            >
              <span className="text-[#FF5500] font-bold text-xs tracking-wider text-center leading-tight px-1">
                INTEG<br/>RICATE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1" data-testid="nav-links-desktop">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-md ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#FF5500] bg-[#FF5500]/10'
                    : 'text-white/80 hover:text-[#FF5500] hover:bg-white/5'
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#FF5500] rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Social Icons + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/integricate/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-linkedin"
              className="text-white/70 hover:text-[#FF5500] transition-colors duration-300 text-xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/integricate"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-github"
              className="text-white/70 hover:text-[#FF5500] transition-colors duration-300 text-xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white/80 hover:text-[#FF5500] transition-colors text-2xl ml-2"
              data-testid="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        data-testid="mobile-menu"
        className={`md:hidden fixed inset-0 top-[80px] bg-[#050505]/98 backdrop-blur-xl transition-all duration-400 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center pt-12 gap-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
              className="text-2xl font-medium tracking-widest uppercase text-white/80 hover:text-[#FF5500] transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
