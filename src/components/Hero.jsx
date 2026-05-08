import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-content animate-fade-in">
        <div className="hero-text">
          <h2 className="greeting">Hello, I'm</h2>
          <h1 className="name">Ashokkumar Nimmaturi</h1>
          <h3 className="role">
            <span className="text-gradient">Java Full Stack Developer</span>
          </h3>
          
          <div className="status-badge">
            <span className="status-dot"></span>
            <span className="status-text">Open to Work</span>
          </div>

          <p className="bio">
            Motivated full stack developer with hands-on experience in building scalable web applications. I specialize in server-side architecture using Core Java, Spring Boot, and Microservices, while creating dynamic user interfaces with React.js and Tailwind CSS.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
            <a href="/Ashokkumar_Resume.pdf" download="Ashokkumar_Resume.pdf" className="btn btn-outline resume-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Resume
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="blob"></div>
          <div className="profile-image-container glass">
            <img src="/profile.png" alt="Ashokkumar Nimmaturi" className="profile-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
