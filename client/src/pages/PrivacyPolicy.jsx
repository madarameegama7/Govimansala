import React from "react";
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-page">

      {/* Header Section */}
      <div className="privacy-hero">
        <h1>Privacy Policy</h1> 
        <p>Home &gt; Privacy Policy</p>
      </div>

      {/* Content Section */}
      <div className="privacy-content">

      <p>Last Update: 20.06.2025</p>

      <p>At Govi Mansala, we are committed to protecting your personal information and your right to privacy. 
        This Privacy Policy explains how we collect, use, store, and protect your information when you visit or 
        use our website and services.</p>

        <h2 className="section-title">1. Information We Collect</h2>
        <p>
            We collect and process the following categories of personal data:
        </p>
        <ul>
            <li>Identity Data:Business name, addresses, and government-issued ID numbers when required for verification.</li>
            <li>Contact Data:Email address, telephone number, billing address, and delivery address.</li>
            <li>Financial Data:Payment card details, bank account information, and transaction history.</li>
            <li>Technical Data:IP address, login credentials, browser type and version, time zone setting, browser plug-in types, operating system, and platform.</li>
            <li>Location Data:Real-time location when using our services, GPS coordinates, and route information.</li>
            <li>Usage Data:Information about how you use our Platform, including session duration, pages visited, and features used.</li>
            <li>Marketing Data:Your preferences in receiving marketing communications and your communication preferences.</li>
        </ul>

        <h2 className="section-title">2. How We Use Your Information</h2>
        <ul>
          <li>To register and verify your business account</li>
          <li>To process orders and manage deliveries</li>
          <li>To communicate updates, offers, or service-related alerts</li>
          <li>To improve the performance and usability of our platform</li>
          <li>To comply with legal or regulatory obligations</li>
        </ul>

        <h2 className="section-title">3. How We Protect Your Information</h2>
          We take data protection seriously and implement the following safeguards:
        <ul>
            <li>SSL encryption for secure data transfer</li>
            <li>Secure cloud storage with limited access</li>
            <li>Password hashing and role-based access controls</li>
            <li>Regular system updates and security monitoring</li>
        </ul>

        <h2 className="section-title">4. Cookies</h2>
         We use cookies and similar technologies to:
        <ul>
          <li>Remember your login session</li>
          <li>Track website usage for analytics</li>
          <li>Improve your experience</li>
        </ul>

        <h2 className="section-title">5. Changes to This Policy</h2>
        <p>
            We may update this Privacy Policy from time to time. The latest version 
            will always be available on our website with an updated effective date.        
        </p>

    </div>
    </div>
);
}

export default PrivacyPolicy;