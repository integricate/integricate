import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Product from './components/Product';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen" data-testid="loading-screen">
        <div className="loader-ring">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="loader-text">INTEGRICATE</p>
      </div>
    );
  }

  return (
    <div className="app-wrapper" data-testid="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Product />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
