import { API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import './Certificates.css';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/certificates`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch certificates", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="certificates" className="certificates-section reveal">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>Loading certificates...</div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default Certificates;
