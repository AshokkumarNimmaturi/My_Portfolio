import { API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import './Projects.css';

const Projects = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjectsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch projects", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="projects-section reveal">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        {loading ? (
           <div style={{ textAlign: 'center', padding: '50px 0' }}>Loading projects...</div>
        ) : (
          <div className="projects-grid">
            {projectsList.map((project, idx) => (
              <div key={idx} className="project-card glass">
                {project.image && (
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                )}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  <div className="project-responsibilities">
                    <h4>Key Responsibilities:</h4>
                    <ul>
                      {project.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-tech">
                    {project.tech_stack.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
