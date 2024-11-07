import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { useGetBlogsQuery } from './features/blog/blogApiSlice.js'
import HomePage from './pages/HomePage.jsx'

function App() {
  return (
    <>
      <HomePage />
    </>
  )
}


export default App
