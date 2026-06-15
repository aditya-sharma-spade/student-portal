import { useState,useEffect } from 'react'
import './App.css'
import PostDetails from './components/postdetails.jsx'
import SeeUsers from './components/seeusers.jsx'
import UpdateDetails from './components/updatedetails.jsx'
import Register from './components/register.jsx'
import Login from './components/Login.jsx'
import Seeprofile from './components/studentprofile.jsx'
import Hosteldetails from './components/hosteldetails.jsx'
import Semesterdetails from './components/semesterdetails.jsx'
import AdminHostel from './components/adminhostel.jsx'
import AdminSemester from './components/adminsemester.jsx'
import Forgotpassword from './components/forgotpassword.jsx'
import Resetpassword from './components/resetpassword.jsx'
import VerifyOtp from './components/verifyotp.jsx'
function App() {
  const role= localStorage.getItem("role");

   const[page,setpage]=useState(role === "student" ? "myprofile" : "get")
  
  const [loggedIn,setLoggedIn] =
useState(
   !!localStorage.getItem("token")
);
const [Authpage,setAuthpage]=useState("login")
const [resetPhone,setResetPhone] =
   useState("");
useEffect(() => {
   if(role === "student"){
      setpage("myprofile");
   }
   else if(role === "admin"){
      setpage("get");
   }
}, [role]);
if(!loggedIn){

   if(Authpage==="login"){
      return (
         <Login
            onLogin={()=>
               setLoggedIn(true)
            }

            gotoRegister={()=>
               setAuthpage("register")
            }

            gotoForgotPassword={()=>
               setAuthpage(
                  "forgotpassword"
               )
            }
         />
      );
   }

   if(Authpage==="register"){
      return (
         <Register
            gotoLogin={()=>
               setAuthpage("login")
            }
         />
      );
   }

   if(Authpage==="forgotpassword"){
      return (
         <Forgotpassword
            gotoVerify={(phone)=>{
               setResetPhone(phone);
               setAuthpage(
                  "verifyotp"
               );
            }}
         />
      );
   }

   if(Authpage==="verifyotp"){
      return (
         <VerifyOtp
            phone={resetPhone}

            gotoReset={()=>
               setAuthpage(
                  "resetpassword"
               )
            }
         />
      );
   }

   if(Authpage==="resetpassword"){
      return (
         <Resetpassword
            phone={resetPhone}

            gotoLogin={()=>
               setAuthpage("login")
            }
         />
      );
   }
}
return(
  <>
  <h1 className="title">
  Student Portal Management System
</h1>
  <div className='Navbar'>
 
 {
   role==="admin" && (<>
   <button className="Navbutton" onClick={()=>setpage("get")}>
  See all students
 </button>
 </>)}
 
 { role==="student" && (<>
 <button className="Navbutton" onClick={()=>setpage("myprofile")}>
   See my details
 </button>
 </>
 )}

 { role==="student" && (<>
 <button className="Navbutton" onClick={()=>setpage("mysemester")}>
   See my academic records
 </button>
 </>
 )}

 { role==="student" && (<>
 <button className="Navbutton" onClick={()=>setpage("myhostel")}>
   See my hostel details
 </button>
 </>
 )}
 
 { role==="admin" && (<>
 <button className="Navbutton" onClick={()=>setpage("semesteradmin")}>
   See all semester details
 </button>
 </>
 )}

 { role==="admin" && (<>
 <button className="Navbutton" onClick={()=>setpage("hosteladmin")}>
   See all hostel details
 </button>
 </>
 )}
 
 <button
          onClick={()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("role");
               setLoggedIn(false);
              setpage("get");
          }}>
          Logout
          </button>
  </div>
  
  <div className='container'>
 
 
  {page==="get" && (<SeeUsers/>)}

  {page==="myprofile" && <Seeprofile />}
 
 {page==="mysemester" && <Semesterdetails />}

{page==="myhostel" && <Hosteldetails />}

{page==="semesteradmin" &&
   <AdminSemester />
}

{page==="hosteladmin" &&
   <AdminHostel />
}
 </div>
 </>
  )
}

export default App
