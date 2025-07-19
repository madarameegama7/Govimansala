import React from 'react'
import './headerContent.css';
import { useNavigate } from 'react-router-dom';

function HeaderContent() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignup = () => {
    navigate('/signup');
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className='header'>
      <div className='header-lang'>
        <h1>English | Sinhala </h1>
      </div>
      <div className='header-welcome'>
        <h1>Welcome to <span className="highlight">Govimansala</span></h1>
      </div>
      <div className='header-button'>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </div>
    </div>
  )
}

export default HeaderContent