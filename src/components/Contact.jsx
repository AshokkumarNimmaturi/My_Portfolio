import { API_BASE_URL } from '../config';
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section reveal">
      <div className="container">
        <div className="contact-container glass">
          <div className="contact-info">
            <h2 className="section-title" style={{ textAlign: 'left', left: '0', transform: 'none' }}>
              Let's Connect
            </h2>
            <p className="contact-desc">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
              I'll try my best to get back to you!
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Hyderabad, Telangana, India</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:ASHOKKUMARNIMMATURI@GMAIL.COM">ASHOKKUMARNIMMATURI@GMAIL.COM</a>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>+91 7780131390</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://github.com/AshokkumarNimmaturi" target="_blank" rel="noreferrer" className="social-btn">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ashokkumar-nimmaturi-8a95b4265" target="_blank" rel="noreferrer" className="social-btn">
                LinkedIn
              </a>
            </div>

            <div className="contact-qr-section">
              <h4>Scan to Save Contact</h4>
              <div className="qr-box glass">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=BEGIN:VCARD%0AVERSION:3.0%0AFN:Ashokkumar%20Nimmaturi%0AEMAIL:ASHOKKUMARNIMMATURI@GMAIL.COM%0ATEL:+917780131390%0AURL:https://www.linkedin.com/in/ashokkumar-nimmaturi-8a95b4265%0AEND:VCARD" 
                  alt="Contact QR Code" 
                />
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {submitted ? (
              <div className="success-message animate-fade-in">
                <div className="success-icon">🚀</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I will get back to you soon!</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '1rem' }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                </div>
                {error && <p className="error-message" style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}
                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
