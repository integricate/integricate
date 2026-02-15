import React from 'react';
import {
  FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaLinkedin,
  FaGithub, FaReddit, FaEnvelope, FaGlobe,
} from 'react-icons/fa';
import { FaXTwitter, FaThreads } from 'react-icons/fa6';

const SOCIAL_LINKS = [
  { icon: FaFacebook, href: 'https://www.facebook.com/integricate', label: 'Facebook' },
  { icon: FaReddit, href: 'https://www.reddit.com/user/integricate/', label: 'Reddit' },
  { icon: FaXTwitter, href: 'https://x.com/integricate', label: 'X' },
  { icon: FaInstagram, href: 'https://www.instagram.com/integricate/', label: 'Instagram' },
  { icon: FaTiktok, href: 'https://www.tiktok.com/@integricate', label: 'TikTok' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/company/integricate/', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/integricate', label: 'GitHub' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@integricate', label: 'YouTube' },
  { icon: FaThreads, href: 'https://www.threads.com/@integricate', label: 'Threads' },
  { icon: FaGlobe, href: 'https://www.integricate.com/', label: 'Website' },
];

const EMAILS = [
  { addr: 'info@integricate.com', label: 'General Inquiries' },
  { addr: 'hr@integricate.com', label: 'Human Resources' },
  { addr: 'founder@integricate.com', label: 'Founder' },
];

function Footer() {
  return (
    <footer data-testid="footer" className="relative bg-[#0a0a0a]">
      {/* Waving SVG Top Border */}
      <div className="relative w-full overflow-hidden" style={{ height: '80px' }}>
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: '80px', width: '100%' }}
        >
          <path
            d="M0,40 C120,70 240,10 360,40 C480,70 600,10 720,40 C840,70 960,10 1080,40 C1200,70 1320,10 1440,40 L1440,80 L0,80 Z"
            fill="#FF5500"
            opacity="0.15"
          >
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                M0,40 C120,70 240,10 360,40 C480,70 600,10 720,40 C840,70 960,10 1080,40 C1200,70 1320,10 1440,40 L1440,80 L0,80 Z;
                M0,40 C120,10 240,70 360,40 C480,10 600,70 720,40 C840,10 960,70 1080,40 C1200,10 1320,70 1440,40 L1440,80 L0,80 Z;
                M0,40 C120,70 240,10 360,40 C480,70 600,10 720,40 C840,70 960,10 1080,40 C1200,70 1320,10 1440,40 L1440,80 L0,80 Z
              "
            />
          </path>
          <path
            d="M0,50 C160,80 320,20 480,50 C640,80 800,20 960,50 C1120,80 1280,20 1440,50 L1440,80 L0,80 Z"
            fill="#FF5500"
            opacity="0.25"
          >
            <animate
              attributeName="d"
              dur="4s"
              repeatCount="indefinite"
              values="
                M0,50 C160,80 320,20 480,50 C640,80 800,20 960,50 C1120,80 1280,20 1440,50 L1440,80 L0,80 Z;
                M0,50 C160,20 320,80 480,50 C640,20 800,80 960,50 C1120,20 1280,80 1440,50 L1440,80 L0,80 Z;
                M0,50 C160,80 320,20 480,50 C640,80 800,20 960,50 C1120,80 1280,20 1440,50 L1440,80 L0,80 Z
              "
            />
          </path>
          <path
            d="M0,60 C200,80 400,40 600,60 C800,80 1000,40 1200,60 C1300,70 1380,50 1440,60 L1440,80 L0,80 Z"
            fill="#FF5500"
            opacity="0.5"
          >
            <animate
              attributeName="d"
              dur="3s"
              repeatCount="indefinite"
              values="
                M0,60 C200,80 400,40 600,60 C800,80 1000,40 1200,60 C1300,70 1380,50 1440,60 L1440,80 L0,80 Z;
                M0,60 C200,40 400,80 600,60 C800,40 1000,80 1200,60 C1300,50 1380,70 1440,60 L1440,80 L0,80 Z;
                M0,60 C200,80 400,40 600,60 C800,80 1000,40 1200,60 C1300,70 1380,50 1440,60 L1440,80 L0,80 Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="bg-[#0a0a0a] border-t border-[#FF5500]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-3" data-testid="footer-brand">
                Integricate
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Revolutionizing automation in aerial vehicles. Building the future of unmanned aerial systems.
              </p>
            </div>

            {/* Emails */}
            <div>
              <h4 className="text-sm font-bold text-[#FF5500] uppercase tracking-wider mb-4" data-testid="footer-email-heading">
                Email Us
              </h4>
              <ul className="space-y-3">
                {EMAILS.map((email) => (
                  <li key={email.addr}>
                    <a
                      href={`mailto:${email.addr}`}
                      data-testid={`footer-email-${email.addr.split('@')[0]}`}
                      className="flex items-center gap-2 text-white/50 hover:text-[#FF5500] transition-colors text-sm"
                    >
                      <FaEnvelope className="text-xs text-[#FF5500]/60" />
                      <span>{email.addr}</span>
                    </a>
                    <span className="text-[10px] text-white/25 ml-5">{email.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-bold text-[#FF5500] uppercase tracking-wider mb-4" data-testid="footer-social-heading">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-3" data-testid="footer-social-links">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`footer-social-${social.label.toLowerCase()}`}
                    className="w-9 h-9 rounded-md border border-[#27272A] bg-[#111111] flex items-center justify-center text-white/40 hover:text-[#FF5500] hover:border-[#FF5500]/50 transition-all duration-300 text-sm"
                    aria-label={social.label}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sitemap Links */}
          <div className="mt-10 pt-6 border-t border-[#27272A]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav className="flex flex-wrap gap-6" data-testid="footer-sitemap">
                {['Home', 'Services', 'Product', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    data-testid={`footer-link-${link.toLowerCase()}`}
                    className="text-xs text-white/30 hover:text-[#FF5500] transition-colors uppercase tracking-wider"
                  >
                    {link}
                  </a>
                ))}
              </nav>
              <p className="text-xs text-white/20" data-testid="footer-copyright">
                &copy; {new Date().getFullYear()} Integricate. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
