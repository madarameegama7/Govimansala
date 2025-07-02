import React from 'react'
import './Home.css';
import heroImage from '../assets/homePage/hero-image1.png'

function Home() {
  return (
    <>
    <div className='hero'>
      <div className='hero-text'>
        <h1>
          <span className='hero-heading1'>Fresh from  Farm to Your Shop</span>
        </h1>
        <p className='hero-desc'>
          Connect directly with local farmers and get the freshest produce and organic products delivered to your doorstep.
        </p>
      </div>
      <div className='hero-img'>
        <img src={heroImage} alt="Hero image"/>
      </div>
    </div>

    <div className='shop-by-category'>
        <h1 >Shop By Category</h1>

    </div>
    </>
  )
}

export default Home