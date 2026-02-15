import React, { useEffect, useRef } from 'react';
import { FaMicrochip, FaSatelliteDish, FaCode, FaShieldAlt, FaCogs, FaChartLine } from 'react-icons/fa';

const SERVICES = [
  {
    icon: FaMicrochip,
    title: 'UAS Programming',
    desc: 'Custom firmware and software development for unmanned aerial systems. From flight controllers to autonomous navigation algorithms.',
  },
  {
    icon: FaSatelliteDish,
    title: 'Aerial Automation',
    desc: 'End-to-end automation solutions for drone fleets. Automated mission planning, waypoint navigation, and real-time monitoring.',
  },
  {
    icon: FaCode,
    title: 'Drone Software Solutions',
    desc: 'Full-stack software development for drone operations. Ground control stations, telemetry dashboards, and data analytics platforms.',
  },
  {
    icon: FaShieldAlt,
    title: 'UAS Compliance & Safety',
    desc: 'Guidance on airspace regulations, safety protocols, and compliance frameworks for commercial drone operations.',
  },
  {
    icon: FaCogs,
    title: 'System Integration',
    desc: 'Integrating sensors, cameras, LiDAR, and other payloads with UAS platforms. Seamless hardware-software integration services.',
  },
  {
    icon: FaChartLine,
    title: 'Tech News & Insights',
    desc: 'Stay updated with the latest trends, innovations, and breakthroughs in the drone and aerial technology industry.',
  },
];

function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.05 }
    );
    const elements = sectionRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));
    return () => elements?.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      data-testid="services-section"
      className="py-24 md:py-32 bg-[#050505] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-16">
          <span className="text-[#FF5500] text-xs tracking-[6px] uppercase font-bold">
            What We Do
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
            data-testid="services-title"
          >
            Our Services
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base">
            Comprehensive solutions for unmanned aerial system development, integration, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="fade-in-up group relative bg-[#111111] border border-[#27272A] rounded-xl p-8 transition-all duration-400 hover:border-[#FF5500]/50 hover:shadow-[0_0_30px_rgba(255,85,0,0.08)]"
              style={{ transitionDelay: `${index * 0.1}s` }}
              data-testid={`service-card-${index}`}
            >
              <div className="w-12 h-12 rounded-lg bg-[#FF5500]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF5500]/20 transition-colors duration-300">
                <service.icon className="text-[#FF5500] text-xl" />
              </div>
              <h3
                className="text-lg font-bold text-white mb-3 group-hover:text-[#FF5500] transition-colors duration-300"
                data-testid={`service-title-${index}`}
              >
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
