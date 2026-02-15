import React, { useEffect, useRef } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';

function Product() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
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
      id="product"
      ref={sectionRef}
      data-testid="product-section"
      className="py-24 md:py-32 bg-[#0a0a0a] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-16">
          <span className="text-[#FF5500] text-xs tracking-[6px] uppercase font-bold">
            Open Source
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
            data-testid="product-title"
          >
            Our Product
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base">
            Explore our open-source codebase powering the next generation of unmanned aerial systems.
          </p>
        </div>

        {/* Terminal-style Product Card */}
        <div className="fade-in-up max-w-3xl mx-auto" style={{ transitionDelay: '0.15s' }}>
          <div
            className="rounded-xl overflow-hidden border border-[#27272A] bg-[#111111] shadow-2xl"
            data-testid="product-card"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-5 py-3 bg-[#0d0d0d] border-b border-[#27272A]">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-white/40 font-mono">
                integricate/AIR.01.001
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-xl bg-[#FF5500]/10 border border-[#FF5500]/30 flex items-center justify-center flex-shrink-0">
                  <FaGithub className="text-[#FF5500] text-3xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1" data-testid="product-name">
                    AIR.01.001
                  </h3>
                  <p className="text-white/50 text-sm">
                    by <span className="text-[#FF5500]">integricate</span> / umesh-air
                  </p>
                </div>
              </div>

              <p className="text-white/60 text-base leading-relaxed mb-6" data-testid="product-description">
                This is an Opensource Code for UAS (Unmanned Aircraft System). 
                A cutting-edge repository dedicated to building autonomous aerial vehicle software, 
                flight control systems, and mission-critical drone programming.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#050505] border border-[#27272A] text-xs text-white/60">
                  <FaStar className="text-yellow-500" /> 1 Star
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#050505] border border-[#27272A] text-xs text-white/60">
                  <FaCodeBranch className="text-[#FF5500]" /> 0 Forks
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#050505] border border-[#27272A] text-xs text-white/60">
                  <span className="w-2 h-2 rounded-full bg-green-400" /> Active
                </span>
              </div>

              {/* Code snippet */}
              <div className="bg-[#050505] rounded-lg p-4 mb-6 border border-[#27272A] overflow-x-auto">
                <pre className="text-sm font-mono">
                  <span className="text-[#FF5500]">$</span>{' '}
                  <span className="text-green-400">git clone</span>{' '}
                  <span className="text-white/70">https://github.com/integricate/AIR.01.001.git</span>
                </pre>
              </div>

              {/* CTA */}
              <a
                href="https://github.com/integricate/AIR.01.001"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="product-github-link"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF5500] text-white font-bold text-sm rounded-lg hover:bg-[#FF7733] transition-all duration-300 tracking-wide uppercase"
              >
                <FaGithub className="text-lg" />
                View on GitHub
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
