import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Services from './components/Services'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import BackToTop from './components/BackToTop'
import CommandPalette from './components/CommandPalette'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Generate Circular Favicon
    const generateFavicon = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = '/profile.png'; 
        
        img.onload = () => {
          ctx.beginPath();
          ctx.arc(32, 32, 32, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          
          const size = Math.min(img.width, img.height);
          const x = (img.width - size) / 2;
          const y = (img.height - size) / 2;
          ctx.drawImage(img, x, y, size, size, 0, 0, 64, 64);
          
          const link = document.querySelector("link[rel~='icon']");
          if (link) link.href = canvas.toDataURL();
        };
      } catch (e) {
        console.error("Favicon error", e);
      }
    };

    generateFavicon();

    // 2. Page Loader Timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 3. Scroll Reveal Logic (Runs after loading finishes)
  useEffect(() => {
    if (!isLoading) {
      const observerOptions = { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <CustomCursor />
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </div>
  )
}

export default App;
