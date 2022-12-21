import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/views/Home"
import Footer from './components/atoms/Footer'
import Header from './components/atoms/Header'
import Lessons from './components/views/Lessons'
import Quizz from './components/views/Quizz'
import About from './components/views/About'
import Login from './components/views/Login'

const App = () => {
  return (
    <>
      <BrowserRouter>

        <header>
          <Header />
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/lessons' element={<Lessons />} />
            <Route path='/quizz' element={<Quizz />} />
            <Route path='/about' element={<About />} />
            {/* Gestion des pages non référencées par le sélecteur * avec redirection sur la page Home */}
            <Route path='*' element={<Home />} />
          </Routes>
        </main>

        <footer>
          <Footer />
        </footer>

      </BrowserRouter>
    </>
  )
}

export default App