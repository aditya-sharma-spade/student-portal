import { useState } from 'react'


import './App.css'

function App() {
const[name,setname]=useState("");
const[email,setemail]=useState("");
const[age,setage]=useState("");

const handlesubmit = async(e)=>{

e.preventDefault();
console.log(name)
console.log(email)
console.log(age)
}

  return (
 <>
 <div>
<h1> User form</h1>
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
<button type="submit">
Submit
</button>
</form>
 </div>
 </>
  )
}

export default App
