import { API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import './Timeline.css';

const Timeline = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/timeline`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setExperiences(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch timeline", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
     return <div className="timeline-container" style={{ textAlign: 'center' }}>Loading timeline...</div>;
  }

  return (
    <div className="timeline-container">
      {experiences.map((exp, idx) => (
        <div key={idx} className="timeline-item">
          <div className="timeline-dot">
            {exp.type === 'work' ? '💼' : '🎓'}
          </div>
          <div className="timeline-content glass">
            <span className="timeline-date">{exp.date}</span>
            <h3 className="timeline-title">{exp.title}</h3>
            <h4 className="timeline-company">{exp.company} <span className="timeline-location">• {exp.location}</span></h4>
            <p className="timeline-desc">{exp.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
