import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/Login.css';
import { loginApi } from '../services/authenticate';

function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('');
    try{
      const response=await loginApi(email,password);
      const role=response.data.role;
      localStorage.setItem('role',role);

      if(role==='FARMER'){
        navigate('/farmer');
      }else if(role==='BUYER'){
        navigate('/buyer');
      }else if(role === 'VENDOR'){
        navigate('/vendor/home')
      }else if(role === 'ADMIN'){
        navigate('/admin')
      }
      else{
        navigate('/');
      }
      console.log('Success');
    }catch(err){
      setError('Invalid email or password')
      console.log('Error')
    }
  }

  
  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to your account</h2>
          <p>
            <span className="signup-link">Don't have an account? Sign up</span>
          </p>
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email address" value={email}
          onChange={e=> setEmail(e.target.value) }
          required />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password}
          onChange={e=>setPassword(e.target.value)} required/>
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>
          {error && <div className="error-message">{error}</div>}
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