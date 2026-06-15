import { useState } from "react";
function Registerusers({gotoLogin}){
     const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[phone,setphone]=useState("")
    const[password,setpassword]=useState("")
    const[age,setage]=useState("")
    const[course,setcourse]=useState("")
    
    
    const handleregister = async()=>{
     if(
        !name ||
        !email ||
        !phone ||
        !password ||
        !age ||
        !course
    ){
        alert("All fields are required");
        return;
    }

    if(!email.includes("@")){
        alert("Please enter a valid email");
        return;
    }

    if(password.length < 8){
        alert(
            "Password must be at least 8 characters"
        );
        return;
    }

    if(age < 16 || age > 100){
        alert("Please enter a valid age");
        return;
    }

  

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
           password,
           age,
           course
         })

        }
       
    )
    const data = await response.json();
    console.log(data);
    alert(data.message)
    if(response.ok)
    {gotoLogin();}
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
<input type="text" placeholder="Enter your Email" value={email} className="login-input"
onChange={(e)=>{
setemail(e.target.value)
}}
/>
<input type="text" placeholder="Enter your Phone Number" value={phone} className="login-input"
onChange={(e)=>{
setphone(e.target.value)
}}
/>
<input type="password" placeholder="Enter your Password" value={password} className='login-input'
onChange={(e)=>{
setpassword(e.target.value)
}}
/>
<input type="number" placeholder="Enter your age" value={age} className='login-input'
onChange={(e)=>{
setage(e.target.value)
}}
/>
<input type="text" placeholder="Enter your course" value={course} className='login-input'
onChange={(e)=>{
setcourse(e.target.value)
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