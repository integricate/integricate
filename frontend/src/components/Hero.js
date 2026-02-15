import React, { useEffect, useRef } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SOCIAL_LINKS = [
  { icon: FaFacebook, href: 'https://www.facebook.com/integricate', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/integricate/', label: 'Instagram' },
  { icon: FaTiktok, href: 'https://www.tiktok.com/@integricate', label: 'TikTok' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@integricate', label: 'YouTube' },
  { icon: FaXTwitter, href: 'https://x.com/integricate', label: 'X' },
];

function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));
    return () => elements?.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.95) 100%), url('https://images.unsplash.com/photo-1521810794802-50135d944e8f?w=1920&q=80') center/cover no-repeat`,
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,85,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,85,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="fade-in-up">
          <p
            className="text-[#FF5500] text-sm tracking-[6px] uppercase mb-6 font-bold"
            style={{ fontFamily: 'Arial, sans-serif' }}
            data-testid="hero-subtitle"
          >
            Welcome to
          </p>
        </div>

        <div className="fade-in-up" style={{ transitionDelay: '0.15s' }}>
          <h1
            className="text-5xl sm:text-6xl md:text-8xl mb-8 text-white leading-tight"
            style={{ fontFamily: "'ByteBounce', sans-serif" }}
            data-testid="hero-title"
          >
            Integricate
          </h1>
        </div>

        <div className="fade-in-up" style={{ transitionDelay: '0.3s' }}>
          <p
            className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-6"
            style={{ fontFamily: "'ByteBounce', sans-serif" }}
            data-testid="hero-welcome-text"
          >
            Dear Visitor, Welcome to Integricate - a forward-thinking startup revolutionizing 
            automation in aerial vehicles. We are dedicated to bringing you the latest in 
            cutting-edge technology and aerial innovations, as well as insightful news from 
            the tech and drone world.
          </p>
        </div>

        <div className="fade-in-up" style={{ transitionDelay: '0.45s' }}>
          <p
            className="text-white/50 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-4"
            style={{ fontFamily: "'ByteBounce', sans-serif" }}
            data-testid="hero-description"
          >
            Stay connected with us and explore our updates, tips, and exclusive content on social media:
          </p>
        </div>

        <div className="fade-in-up" style={{ transitionDelay: '0.55s' }}>
          <div className="flex items-center justify-center gap-5 mb-8" data-testid="hero-social-links">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`hero-social-${social.label.toLowerCase()}`}
                className="w-12 h-12 rounded-full border border-[#27272A] bg-[#111111] flex items-center justify-center text-white/60 hover:text-[#FF5500] hover:border-[#FF5500] hover:bg-[#FF5500]/10 transition-all duration-300 text-lg"
                aria-label={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        <div className="fade-in-up" style={{ transitionDelay: '0.65s' }}>
          <p
            className="text-white/50 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-6"
            style={{ fontFamily: "'ByteBounce', sans-serif" }}
            data-testid="hero-cta-text"
          >
            Whether you're a tech enthusiast, a drone hobbyist, or someone curious about the 
            future of aerial automation, Integricate is here to inspire, inform, and assist you 
            every step of the way.
          </p>
        </div>

        <div className="fade-in-up" style={{ transitionDelay: '0.75s' }}>
          <p
            className="text-[#FF5500] text-lg sm:text-xl font-bold tracking-wider"
            style={{ fontFamily: "'ByteBounce', sans-serif" }}
            data-testid="hero-tagline"
          >
            Join our journey and soar into the future with us!
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="fade-in-up mt-14" style={{ transitionDelay: '0.9s' }}>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center text-white/30 hover:text-[#FF5500] transition-colors duration-300"
            data-testid="scroll-indicator"
            aria-label="Scroll to services"
          >
            <span className="text-xs tracking-widest uppercase mb-2">Explore</span>
            <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1">
              <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
