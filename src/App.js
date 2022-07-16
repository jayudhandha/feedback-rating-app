import { useState } from "react"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import "./App.css"
import AboutLinkIcon from "./components/AboutLinkIcon"
import FeedbackForm from "./components/FeedbackForm"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import Header from "./components/Header"
import AboutPage from "./pages/AboutPage"

function App() {
  return (
    <>
      <Header />
      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            }
          ></Route>

          <Route path='/about' element={<AboutPage />} />
        </Routes>

        <AboutLinkIcon />
      </div>
    </>
  )
}

export default App
