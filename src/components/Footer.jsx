import { API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [hits, setHits] = useState(null);

  useEffect(() => {
    // Live visitor count from backend
    fetch(`${API_BASE_URL}/api/visits`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.value === 'number') {
           setHits(data.value);
        } else {
           setHits(null);
        }
      })
      .catch(() => setHits(null));
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="text-gradient">&lt; Ashokkumar /&gt;</span>
          <p>Java Full Stack Developer building scalable backend solutions.</p>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </div>
        
        <div className="footer-social">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://github.com/AshokkumarNimmaturi" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://linkedin.com/in/ashokkumar-nimmaturi" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="mailto:ASHOKKUMARNIMMATURI@GMAIL.COM">Email</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ashokkumar Nimmaturi. All rights reserved.</p>
        {hits !== null && (
          <div className="visitor-counter">
            <span className="live-dot"></span>
            <span>Total Profile Views: {hits.toLocaleString()}</span>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
