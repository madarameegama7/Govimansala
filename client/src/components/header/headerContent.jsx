import React, { use } from 'react'
import './headerContent.css';
import {useNavigate} from 'react-router-dom';

function HeaderContent() {
  const navigate=useNavigate();

  const handleLogin=()=>{
    navigate('/login');
  }
  const handleSignup=()=>{
    navigate('/signup');
  }
  return (
    <div className='header'>
        <div className='header-lang'>
            <h1>English | Sinhala </h1>
        </div>
      
      <div className='header-welcome'>
            <h1>Welcome to <span className="highlight">Govimansala</span></h1>
      </div>
      

      <div className='header-button'>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Sign Up</button>
      </div>
      
    </div>
  )
}

export default HeaderContent
