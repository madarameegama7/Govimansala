import React from 'react';
import './SignUp.css';

function SignUp() {
  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1 className="signup-welcome">Welcome !</h1>
        <form className="signup-form">
          <h2>Sign Up</h2>
          <p>
            Already have an account? <span className="login-link">Login</span>
          </p>
          <label>Business Name</label>
          <input type="text" placeholder="Enter your business name" />
          <label>Business Address</label>
          <input type="text" placeholder="Enter your complete business address" />
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" />
          <label>Mobile Number</label>
          <input type="text" placeholder="Enter your mobile number" />
          <label>Password</label>
          <input type="password" placeholder="Create a Password" />
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
      <div className="signup-right">
        <img src="/logo.png" alt="Logo" className="signup-logo" />
        <h1 className="signup-brand">
          Govi <span>Mansala</span>
        </h1>
        <p className="signup-tagline">
          Connect - Cultivate - Prosper <span role="img" aria-label="plant">🌱</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;