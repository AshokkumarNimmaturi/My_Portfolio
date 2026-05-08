import './Projects.css';

const Projects = () => {
  const projectsList = [
    {
      title: "Aja Interview Vault",
      description: "A comprehensive internship portal and interview management platform. Features secure user authentication, payment processing, voice/SMS communications, and automated PDF report generation.",
      image: "/aja_interview_vault_mockup_1778231430150.png",
      techStack: ["React", "Spring Boot", "Spring Security", "JWT", "MySQL", "Razorpay", "Twilio SDK"],
      responsibilities: [
        "Architected the backend with Spring Boot, integrating JWT for secure authentication.",
        "Integrated third-party APIs including Razorpay for payments and Twilio for voice/SMS communication.",
        "Developed RESTful APIs and managed data persistence using Spring Data JPA and MySQL.",
        "Collaborated on dynamic, responsive user interfaces using React and Tailwind CSS."
      ],
      githubUrl: "https://github.com/AshokkumarNimmaturi/Aja_Interview_Vault"
    },
    {
      title: "DTS (Digicomputax)",
      description: "A web-based tax management application designed to automate tax calculation, filing, and reporting for individuals and organizations. Enables secure management of tax data and compliance with statutory regulations.",
      image: "/dts_tax_dashboard_mockup_1778231458645.png",
      techStack: ["Core Java", "Spring Boot", "Microservices", "Hibernate", "MySQL", "REST APIs"],
      responsibilities: [
        "Developed backend modules using Core Java and Spring Boot for tax processing.",
        "Implemented CRUD operations and database interactions using Hibernate ORM and Spring Data JPA.",
        "Architected microservices to handle different tax modules independently and efficiently."
      ]
    },
    {
      title: "Big Loan",
      description: "A banking application designed to manage loan processing based on property valuation. Evaluates customer eligibility by analyzing property value, income details, and predefined banking rules.",
      image: "/big_loan_banking_mockup_1778231481423.png",
      techStack: ["Java", "Spring Boot", "Microservices", "Hibernate", "MySQL", "Spring Data JPA", "REST APIs"],
      responsibilities: [
        "Developed backend logic using Spring Boot for loan eligibility and processing.",
        "Created scalable microservices to handle loan applications and property valuations.",
        "Implemented Hibernate ORM and Spring Data JPA for robust data persistence.",
        "Optimized REST APIs for high-performance communication between microservices."
      ]
    }
  ];

  return (
    <section id="projects" className="projects-section reveal">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

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
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>

                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
