import './Services.css';

const Services = () => {
  const services = [
    {
      icon: "🏗️",
      title: "Backend Architecture",
      desc: "Designing robust, scalable server-side systems using Spring Boot and Microservices with a focus on performance."
    },
    {
      icon: "🌐",
      title: "Full Stack Development",
      desc: "Building end-to-end web applications with modern frontends in React.js and high-performance Java backends."
    },
    {
      icon: "🔌",
      title: "API Design & Integration",
      desc: "Developing secure RESTful APIs with JWT and integrating third-party services like Twilio and Razorpay."
    },
    {
      icon: "🗄️",
      title: "Database Optimization",
      desc: "Expertise in relational database management with MySQL and efficient data persistence using Hibernate & JPA."
    }
  ];

  return (
    <section id="services" className="services-section reveal">
      <div className="container">
        <h2 className="section-title">What I Do</h2>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-card glass">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
