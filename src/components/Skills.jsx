import './Skills.css';
import Marquee from './Marquee';

const Skills = () => {
  const skillCategories = [
    {
      title: "Backend Core",
      skills: ["Core Java", "Spring Framework", "Spring Boot", "Microservices Architecture"]
    },
    {
      title: "Data & ORM",
      skills: ["Hibernate", "Spring Data JPA", "MySQL", "SQL"]
    },
    {
      title: "Web & APIs",
      skills: ["React.js", "RESTful APIs", "Tailwind CSS", "JavaScript", "HTML/CSS"]
    },
    {
      title: "Tools & Methodologies",
      skills: ["Git", "Maven", "STS/Eclipse", "IntelliJ IDEA", "Agile", "OOP"]
    }
  ];

  return (
    <section id="skills" className="skills-section reveal">
      <Marquee />
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
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
      </div>
    </section>
  );
};

export default Skills;
