import { useState } from "react";


function PostDetails() {
const[name,setname]=useState("");
const[email,setemail]=useState("");
const[age,setage]=useState("");

const handlesubmit = async(e)=>{
 const token =
    localStorage.getItem("token");
e.preventDefault();
try{
  const response= await fetch("http://localhost:3000/students/add",
    {
      method: "POST",
     headers:{
      "Content-Type": "application/json",
      Authorization:
            `Bearer ${token}`
     },
     body:JSON.stringify({
      name,
      email,
      age
     })


    }
  )
const data= await response.json()
console.log(data)
setname("");
setemail("");
setage("");
}
catch(error){
  console.log(error.message)
}
}

  return (
 <>
 <div>
<h1> Student form</h1>
<h3> Please submit your details here</h3>
<form onSubmit={handlesubmit}>
<input type="text" placeholder="Enter name" value={name} 
onChange={
(e)=>{
  setname(e.target.value)
}
}
/> <br />
<input type="text" placeholder="Enter email" value={email}
onChange={
(e)=>{
  setemail(e.target.value)
}
}
/> <br />

<input type="number" placeholder="Enter your age" value={age}
onChange={
(e)=>{
  setage(e.target.value)
}
}
/> <br />
<button type="submit" className="submitbutton">
Submit
</button>
</form>
 </div>
 </>
  )
}

export default PostDetails