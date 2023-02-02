import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/views/Home"
import Footer from './components/organisms/Footer'
import Header from './components/organisms/Header'
import Lessons from './components/views/Lessons'
import Quizz from './components/views/Quizz'
import About from './components/others/About'
import Login from './components/views/Login'
import LessonById from './components/views/LessonById'
import QuizzById from './components/views/QuizzById'
import SignUp from './components/views/SignUp'
import AddLesson from './components/organisms/AddLesson'
import AddQuizz from './components/organisms/AddQuizz'
import ContactUs from './components/others/ContactUs'
import Mentions from './components/others/Mentions'
import Charte from './components/others/Charte'
import PrivacyPolicy from './components/others/PrivacyPolicy'
import CookieManagement from './components/others/CookieManagement'
import Logout from './components/views/Logout'
import Test from './components/others/Test'

const App = () => {
  return (
    <>
      <BrowserRouter>

        <header>
          <Header />
        </header>

        <main>
          <Routes>
            <Route path='/test' element={<Test/>} />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/lessons' element={<Lessons />} />
            <Route path='/addLesson' element={<AddLesson />} />
            <Route path='/addQuizz' element={<AddQuizz />} />
            <Route path='/lesson/:id' element={<LessonById />} />
            <Route path='/quizz/:id' element={<QuizzById />} />
            <Route path='/quizz' element={<Quizz />} />
            {/* Gestion des pages complémentaires */}
            <Route path='/about' element={<About />} />
            <Route path='/contactUs' element={<ContactUs/>} />
            <Route path='/mentions' element={<Mentions/>} />
            <Route path='/charte' element={<Charte/>} />
            <Route path='/privacyPolicy' element={<PrivacyPolicy/>} />
            <Route path='/cookieManagement' element={<CookieManagement/>} />
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