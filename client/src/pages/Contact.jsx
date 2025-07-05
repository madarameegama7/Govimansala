import React, { useState } from 'react';
import { Phone, Headphones, Globe, Send, Facebook, Instagram, Linkedin } from 'lucide-react';
import '../pages/styles/Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setIsSubmitting(false);
    alert('Message sent successfully!');
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <div className="contact-hero">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">We’d love to hear from you! Reach out to our support team any time.</p>
      </div>

      {/* Contact Form Section */}
      <div className="contact-container">
        <div className="contact-form-card">
          <h2 className="form-heading">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
            </button>
          </form>
        </div>

        <div className="support-box">
          <h3>Need Help?</h3>
          <p>Contact our support team</p>
          <div className="support-icons">
            <Phone size={32} />
            <Headphones size={32} />
          </div>
        </div>
      </div>

      {/* Social Section */}
      <div className="social-section">
        <h3><Globe size={24} /> Follow Us</h3>
        <p>Stay connected for updates and fresh stories</p>
        <div className="social-links">
          <a href="https://facebook.com/govimansala" target="_blank" rel="noreferrer">
            <Facebook /> Facebook
          </a>
          <a href="https://instagram.com/govimansala" target="_blank" rel="noreferrer">
            <Instagram /> Instagram
          </a>
          <a href="https://linkedin.com/govimansala" target="_blank" rel="noreferrer">
            <Linkedin /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
