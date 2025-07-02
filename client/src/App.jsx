import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderContent from './components/header/headerContent'
import HeroContent from './components/hero/heroContent'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import Marketplace from './pages/Marketplace'
import Home from './pages/Home'
import '../index.css';

function App() {

  return (
    <BrowserRouter>
     <HeaderContent/>
    <HeroContent/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>} />
      <Route path="/marketplace" element={<Marketplace/>} />
      <Route path="/about" element={<AboutUs/>} />

    </Routes>
    </BrowserRouter>
    
   
  
    
  )
}

export default App
