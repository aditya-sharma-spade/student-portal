import { useState } from 'react'
import './App.css'
import PostDetails from './components/postdetails.jsx'
import SeeUsers from './components/seeusers.jsx'
import UpdateDetails from './components/updatedetails.jsx'
import Register from './components/register.jsx'
import Login from './components/Login.jsx'

function App() {
  const[page,setpage]=useState("add")
  const [loggedIn,setLoggedIn] =
useState(
   !!localStorage.getItem("token")
);
const [Authpage,setAuthpage]=useState("login")
if(!loggedIn){

   if(Authpage==="login"){
      return (
         <Login
            onLogin={() => setLoggedIn(true)}
            gotoRegister={() =>
               setAuthpage("register")
            }
         />
      );
   }

   return (
      <Register
         gotoLogin={() =>
            setAuthpage("login")
         }
      />
   );
}
return(
  <>
  <h1 className="title">
  Student Portal Management System
</h1>
  <div className='Navbar'>
  <button className="Navbutton" onClick={()=>setpage("add")}>
    Add Student
  </button>

 <button className="Navbutton" onClick={()=>setpage("get")}>
  See all students
 </button>
 <button
          onClick={()=>{
            localStorage.removeItem("token");
            setLoggedIn(false);
          }}>
          Logout
          </button>
  </div>
  
  <div className='container'>
  {page==="add" && <PostDetails />}
 
  {page==="get" && (<SeeUsers gotoadd={()=>setpage("add")} />)}

 

 </div>
 </>
  )
}

export default App
