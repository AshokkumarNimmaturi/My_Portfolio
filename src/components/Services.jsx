import { API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch services", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="services" className="services-section reveal">
      <div className="container">
        <h2 className="section-title">What I Do</h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>Loading services...</div>
        ) : (
          <div className="services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-card glass">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
