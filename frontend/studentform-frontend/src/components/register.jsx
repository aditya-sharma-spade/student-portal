import { useState } from "react";
function Registerusers({gotoLogin}){
     const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[phone,setphone]=useState("")
    const[password,setpassword]=useState("")
    
    
    const handleregister = async()=>{
  
    const response= await fetch( "http://localhost:3000/auth/register",
        {
        method:"POST",
         headers:{
             "Content-Type": "application/json"
         },
         body:JSON.stringify({
           name,
           email,
           phone,
           password
         })

        }
       
    )
    const data = await response.json();
    console.log(data);
    alert(data.message)
    gotoLogin();
}
    return(
<>
<div className='login-container'>
<input type="text" placeholder="Enter your Name" value={name} className="login-input"
onChange={(e)=>{
setname(e.target.value)
}
}
/>
<input type="text" placeholder="Enter your email" value={email} className="login-input"
onChange={(e)=>{
setemail(e.target.value)
}}
/>
<input type="text" placeholder="Enter your phone" value={phone} className="login-input"
onChange={(e)=>{
setphone(e.target.value)
}}
/>
<input type="password" placeholder="Enter your password" value={password} className='login-input'
onChange={(e)=>{
setpassword(e.target.value)
}}
/>
<button type="Submit" onClick={handleregister} className="login-btn" >
    Register
</button>
</div>
</>
    )  
}
export default Registerusers