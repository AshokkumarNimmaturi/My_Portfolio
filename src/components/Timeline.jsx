import './Timeline.css';

const Timeline = () => {
  const experiences = [
    {
      title: "Java Full Stack Developer",
      company: "Aja Consulting Services",
      location: "Hyderabad, Telangana",
      date: "July 2025 - Present",
      description: "Developing enterprise applications using Core Java, Hibernate, and Spring Boot. Optimizing database interactions with MySQL and ensuring APIs are fast, secure, and seamlessly integrated with modern React frontends.",
      type: "work"
    },
    {
      title: "B.Tech in Electronics and Communication Engineering",
      company: "Mahatma Gandhi University",
      location: "Nalgonda",
      date: "2020 - 2024 • Graduated",
      description: "Studied core subjects including Programming Fundamentals, Database Management Systems, and Software Engineering, building a strong foundation in problem-solving and OOP.",
      type: "education"
    }
  ];

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
