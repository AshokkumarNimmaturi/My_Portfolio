import { useState, useEffect } from 'react';
import './About.css';
import Timeline from './Timeline';

const StatItem = ({ target, label }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about-stats');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = parseInt(target);
          if (isNaN(end)) {
            setCount(target);
            return;
          }
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start) + (target.includes('+') ? '+' : ''));
            }
          }, 16);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [target, hasAnimated]);

  return (
    <div className="stat-card glass">
      <h3>{count || '0'}</h3>
      <p>{label}</p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="about-section reveal">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-main">
            <div className="about-text glass">
              <p>
                Hello! I'm Ashokkumar, a passionate <strong>Java Full Stack Developer</strong> based in Hyderabad, Telangana. 
                I have 1 year of hands-on experience in building and maintaining scalable full-stack applications.
              </p>
              <p>
                My journey in software development started with a strong foundation in Object-Oriented Programming and has evolved into 
                architecting robust backend systems and dynamic frontends. I specialize in the Spring ecosystem, working extensively with <strong>Spring Boot</strong>, 
                <strong>Hibernate</strong>, and <strong>Microservices</strong>, while simultaneously building modern, responsive user interfaces using <strong>React.js</strong> and <strong>Tailwind CSS</strong>.
              </p>
              <p>
                Currently, I work at <strong>Aja Consulting Services</strong>, where I focus on developing enterprise applications, 
                optimizing database interactions with MySQL, and ensuring our APIs are fast, secure, and seamlessly integrated with React frontends.
              </p>
              <div className="about-timeline">
                <h3 style={{ marginBottom: '1rem' }}><span className="text-gradient">Experience & Education</span></h3>
                <Timeline />
              </div>
              <div className="github-activity">
                <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}><span className="text-gradient">GitHub Activity</span></h3>
                <div className="github-chart glass">
                  <img 
                    src="https://ghchart.rshah.org/10b981/AshokkumarNimmaturi" 
                    alt="Ashokkumar Nimmaturi's Github Chart" 
                    style={{ width: '100%', filter: 'brightness(1.1) contrast(1.1)' }}
                  />
                </div>
              </div>
            </div>
            
            <div className="about-stats" id="about-stats">
              <StatItem target="1+" label="Years Experience" />
              <StatItem target="Java" label="Core Expertise" />
              <StatItem target="Spring" label="Framework Master" />
              <StatItem target="REST" label="API Design" />
            </div>
          </div>

          <div className="current-focus reveal">
            <h3 style={{ marginBottom: '1.5rem', marginTop: '2.5rem' }}>
              <span className="text-gradient">Currently Mastering</span>
            </h3>
            <div className="focus-grid">
              <div className="focus-card glass">
                <span className="focus-icon">🐍</span>
                <div className="focus-info">
                  <h4>Python & FastAPI</h4>
                  <p>Building high-performance async APIs and microservices.</p>
                </div>
              </div>
              <div className="focus-card glass">
                <span className="focus-icon">☁️</span>
                <div className="focus-info">
                  <h4>Cloud & Deployment</h4>
                  <p>Mastering AWS, Docker, and CI/CD for scalable deployment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="personal-details reveal">
            <div className="personal-grid">
              <div className="personal-column">
                <h3 style={{ marginBottom: '1.5rem', marginTop: '2.5rem' }}>
                  <span className="text-gradient">Core Strengths</span>
                </h3>
                <ul className="strength-list">
                  <li className="glass"><span>🚀</span> Quick Learner & Adaptable</li>
                  <li className="glass"><span>🤝</span> Collaborative Team Player</li>
                  <li className="glass"><span>💡</span> Idea Sharer & Problem Solver</li>
                  <li className="glass"><span>🎯</span> Focused on Quality Delivery</li>
                </ul>
              </div>
              <div className="personal-column">
                <h3 style={{ marginBottom: '1.5rem', marginTop: '2.5rem' }}>
                  <span className="text-gradient">Beyond Coding</span>
                </h3>
                <div className="interests-tags">
                  <span className="interest-tag glass">🌌 Space Exploration</span>
                  <span className="interest-tag glass">🔬 Science Tech</span>
                  <span className="interest-tag glass">📚 Tech Blogging</span>
                  <span className="interest-tag glass">🌱 Self Improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
