import {useState} from 'react'


function UpdateDetails(){
const[name,setname]=useState("")
const[email,setemail]=useState("")
const[age,setage]=useState("")
const[id,setid]=useState("")
 
const handleupdate = async(e)=>{
    try{
       const updates={}
       if(name !== ""){
    updates.name = name;
  }

  if(email !== ""){
    updates.email = email;
  }

  if(age !== ""){
    updates.age = age;
  }

        const response= await fetch(`http://localhost:3000/users/update/${id}`,{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(updates),
    })
       const data= await response.json();
       setid("")
       setage("")
       setname("")
       setemail("")
    }
    catch(error){
     console.log(error.message)
    }
}
    
    return(
        <>
        
        
        <input type="Number" placeholder="Enter your Id" value={id}
        onChange={(e)=>{
         setid(e.target.value)
        }
        }
        />
        <input type="text" placeholder="Change name to" value={name}
         onChange={(e)=>{
            setname(e.target.value)
        }}
        />
        <input type="Number" placeholder="Change age to" value={age}
         onChange={(e)=>{
            setage(e.target.value)
        }}
        />
        <input type="text" placeholder="Change email to" value={email}
        onChange={(e)=>{
            setemail(e.target.value)
        }}
        />
         <button type="button" className="otherbutton" onClick={handleupdate}>
         Update your details
        </button>
        </>
    )
}

export default UpdateDetails