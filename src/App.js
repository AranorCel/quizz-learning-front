import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/views/Home"
import Footer from './components/organisms/Footer'
import Header from './components/organisms/Header'
import Lessons from './components/views/Lessons'
import Quizz from './components/views/Quizz'
import About from './components/views/About'
import Login from './components/views/Login'
import LessonById from './components/views/LessonById'
import QuizzById from './components/views/QuizzById'
import Logout from './components/views/Logout'
import SignUp from './components/views/SignUp'
import AddLesson from './components/organisms/AddLesson'
import AddQuizz from './components/organisms/AddQuizz'

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
            <Route path='/logout' element={<Logout/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/lessons' element={<Lessons />} />
            <Route path='/addLesson' element={<AddLesson />} />
            <Route path='/addQuizz' element={<AddQuizz />} />
            <Route path='/lesson/:id' element={<LessonById />} />
            <Route path='/quizz/:id' element={<QuizzById />} />
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