import { useState } from 'react'
import './App.css'
import PostDetails from './components/postdetails.jsx'
import SeeUsers from './components/seeusers.jsx'
import UpdateDetails from './components/updatedetails.jsx'
import DeleteUsers from './components/deleteusers.jsx'
function App() {
return(
  <>
  <div className='container'>
  <PostDetails />
 
  <SeeUsers />

  <UpdateDetails />

  <DeleteUsers />
 </div>
 </>
  )
}

export default App
