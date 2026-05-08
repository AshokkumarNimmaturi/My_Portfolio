import './Marquee.css';

const Marquee = () => {
  const skills = [
    "Java", "Spring Boot", "React.js", "MySQL", "Hibernate", "Microservices", 
    "Tailwind CSS", "REST APIs", "Twilio", "Razorpay", "Git", "Maven"
  ];

  // Duplicate the array to create a seamless loop
  const marqueeItems = [...skills, ...skills, ...skills];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {marqueeItems.map((skill, idx) => (
          <div key={idx} className="marquee-item glass">
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
