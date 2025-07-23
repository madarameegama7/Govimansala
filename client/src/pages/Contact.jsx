import React, { useState } from 'react';
import '../pages/styles/Contact.css';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import contactImage from '../assets/Marketplace/contactPage_image.jpg'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-wrapper">
      {/* Contact Info Section */}
      <div className="contact-info-container">
        <img src={contactImage} alt="Contact" className="contact-img" />

        <div className="contact-details">
          <h2>Your Voice Matters</h2>
          <p className="contact-desc">
            Agriculture is a vital cornerstone of our society, encompassing everything from the cultivation of crops 
            to the care of livestock. It provides us with food, clothing, medicine, and livelihoods. At the heart of this 
            industry are the farmers, vendors, buyers, and experts who make it all possible. Whether you have a question, 
            feedback, or simply want to connect — we’re here to support and grow with you.
          </p>

          <div className="contact-block">
            <p><strong>Address</strong><br />Colombo, Western Province, Sri Lanka</p>
            <p><strong>Phone</strong><br />+94 75 123 4532</p>
            <p><strong>Email</strong><br />support@govimansala.lk</p>
          </div>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Message Form Section */}
      <div className="contact-form-section">
        <h2>Send Your Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
