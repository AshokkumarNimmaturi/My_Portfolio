import './Certificates.css';

const Certificates = () => {
  const certs = [
    {
      title: "Java Full Stack Development",
      organization: "Career Bridge IT Services",
      date: "Nov 2024",
      grade: "A",
      image: "/certificate_java_fullstack.png",
      description: "Comprehensive 6-month training covering Core Java, Spring Boot, Microservices, and React.js."
    }
  ];

  return (
    <section id="certificates" className="certificates-section reveal">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        <div className="certificates-grid">
          {certs.map((cert, index) => (
            <div key={index} className="cert-card glass">
              <div className="cert-image">
                <img src={cert.image} alt="" />
                <div className="cert-overlay">
                  <button onClick={() => window.open(cert.image, '_blank')} className="view-cert-btn">
                    View Full Certificate
                  </button>
                </div>
              </div>
              <div className="cert-info">
                <div className="cert-badge">Grade {cert.grade}</div>
                <h3>{cert.title}</h3>
                <p className="cert-org">{cert.organization}</p>
                <p className="cert-date">{cert.date}</p>
                <p className="cert-desc">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
