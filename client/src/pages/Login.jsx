import React from 'react';
import './Login.css'; // Create this CSS file for styling

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form">
          <h2>Sign in to your account</h2>
          <p>
            Don't have an account? <span className="signup-link">Sign up</span>
          </p>
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email address" />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
      <div className="login-right">
        <img src="/logo.png" alt="Logo" className="login-logo" />
      </div>
    </div>
  );
}

export default Login;