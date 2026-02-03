import React from 'react'
import Header from './components/Header'
import Home from './page/home/Home'
import About from './page/about/About'
import Services from './page/services/Services'
import Contact from './page/contact/Contact'
import Shoop_page from './page/Shoop_page'
import MyGoods from './page/myGoods/MyGoods'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Header />
      {/* VALERION style */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/card" element={<Shoop_page />} />
        <Route path="/my" element={<MyGoods />} />
      </Routes>
    </div>
  )
}

export default App
