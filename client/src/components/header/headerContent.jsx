import React from 'react'
import './headerContent.css';

function HeaderContent() {
  return (
    <div className='header'>
        <div className='header-lang'>
            <h1>English | Sinhala </h1>
        </div>
      
      <div className='header-welcome'>
            <h1>Welcome to <span className="highlight">Govimansala</span></h1>
      </div>
      

      <div className='header-button'>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
      
    </div>
  )
}

export default HeaderContent
