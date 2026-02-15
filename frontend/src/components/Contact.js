import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_BACKEND_URL;

function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus('error');
      setErrorMsg('Please fill in all fields.');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      // Try background sync if offline
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        try {
          const cache = await caches.open('pending-contacts');
          await cache.put(
            new Request(`/pending-contact-${Date.now()}`),
            new Response(JSON.stringify(form))
          );
          const reg = await navigator.serviceWorker.ready;
          await reg.sync.register('contact-form-sync');
          setStatus('success');
          setForm({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => setStatus('idle'), 5000);
        } catch (syncErr) {
          setStatus('error');
          setErrorMsg('Unable to send message. Please try again later.');
        }
      } else {
        setStatus('error');
        setErrorMsg('Unable to send message. Please try again later.');
      }
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-testid="contact-section"
      className="py-24 md:py-32 bg-[#050505] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-16">
          <span className="text-[#FF5500] text-xs tracking-[6px] uppercase font-bold">
            Get In Touch
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
            data-testid="contact-title"
          >
            Contact Us
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base">
            Have a question or want to collaborate? Send us a message and we'll get back to you soon.
          </p>
        </div>

        <div className="fade-in-up max-w-2xl mx-auto" style={{ transitionDelay: '0.15s' }}>
          <form
            onSubmit={handleSubmit}
            className="bg-[#111111] border border-[#27272A] rounded-xl p-8 space-y-6"
            data-testid="contact-form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  data-testid="contact-input-name"
                  placeholder="Your name"
                  className="w-full bg-transparent border-b-2 border-[#27272A] text-white py-3 px-1 text-sm focus:border-[#FF5500] focus:outline-none transition-colors placeholder-white/20"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  data-testid="contact-input-email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b-2 border-[#27272A] text-white py-3 px-1 text-sm focus:border-[#FF5500] focus:outline-none transition-colors placeholder-white/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                data-testid="contact-input-subject"
                placeholder="Subject"
                className="w-full bg-transparent border-b-2 border-[#27272A] text-white py-3 px-1 text-sm focus:border-[#FF5500] focus:outline-none transition-colors placeholder-white/20"
              />
            </div>

            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                data-testid="contact-input-message"
                placeholder="Your message..."
                className="w-full bg-transparent border-b-2 border-[#27272A] text-white py-3 px-1 text-sm focus:border-[#FF5500] focus:outline-none transition-colors resize-none placeholder-white/20"
              />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm" data-testid="contact-success">
                <FaCheckCircle />
                Thank you for reaching out! We will get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm" data-testid="contact-error">
                <FaExclamationCircle />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              data-testid="contact-submit-button"
              className="w-full py-4 bg-[#FF5500] text-white font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-[#FF7733] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
