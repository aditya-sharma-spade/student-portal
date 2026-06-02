import { useState } from 'react'
import './App.css'
import PostDetails from './components/postdetails.jsx'
import SeeUsers from './components/seeusers.jsx'
import UpdateDetails from './components/updatedetails.jsx'
import DeleteUsers from './components/deleteusers.jsx'

function App() {
  const[page,setpage]=useState("add")
return(
  <>
  <div className='Navbar'>
  <button className="Navbutton" onClick={()=>setpage("add")}>
    Add User
  </button>
   <button className="Navbutton" onClick={()=>setpage("update")}>
    Update User Details
   </button>
 <button className="Navbutton" onClick={()=>setpage("get")}>
  See all users
 </button>
 <button className="Navbutton" onClick={()=>setpage("delete")}>
  Delete user details
 </button>
  </div>
  
  <div className='container'>
  {page==="add" && <PostDetails />}
 
  {page==="get" && <SeeUsers />}

  {page==="update" && <UpdateDetails />}

  {page==="delete" && <DeleteUsers />}

 </div>
 </>
  )
}

export default App
