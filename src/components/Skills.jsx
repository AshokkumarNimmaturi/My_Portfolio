import { API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import './Skills.css';
import Marquee from './Marquee';

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/skills`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSkillCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch skills", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="skills" className="skills-section reveal">
      <Marquee />
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>Loading skills...</div>
        ) : (
          <div className="skills-grid">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="skill-category glass">
                <h3 className="category-title">{category.title}</h3>
                <div className="skill-tags">
                  {category.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
