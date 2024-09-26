import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useGetBlogsQuery } from './features/blog/blogApiSlice.js'
// import { useGetUserProfileQuery } from './features/auth/authApiSlice.js'

function App() {
  const { data: blogs, isLoading, isError, error } = useGetBlogsQuery();
  // console.log(useGetUserProfileQuery());


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.data.message}</div>

  return (
    <ul>
      {blogs.map(blog => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </ul>
  )
}


export default App
