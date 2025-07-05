import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderContent from './components/header/headerContent'
import HeroContent from './components/hero/heroContent'
import Footer from './components/footer/footer'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import Marketplace from './pages/Marketplace'
import Vegetables from './pages/vegetables'
import Home from './pages/Home'
import '../index.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import PrivacyPolicy from './pages/PrivacyPolicy'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {

  return (
    <BrowserRouter>
     <HeaderContent/>
     <HeroContent/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>} />
      <Route path="/marketplace" element={<Marketplace/>} />
      <Route path="/vegetables" element={<Vegetables/>} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
    </Routes>

     <Footer/>

    </BrowserRouter>
    
   
  
    
  )
}

export default App
