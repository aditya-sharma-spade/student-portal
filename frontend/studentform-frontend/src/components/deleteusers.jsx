import {useState}from 'react'

function DeleteUsers(){
const[id,setid]=useState("");

const handledelete = async ()=>{
    try{
    const response= await fetch(`http://localhost:3000/users/delete/${id}`,
     
        {
        method: "DELETE",
       headers: {
        "Content-Type": "application/json"
       }
       

     }

    )
}



catch(error){
console.log(error.message)
}
}

    return(
        <>
         <button type="button" onClick={handledelete} className="otherbutton">Delete data</button>
        <input  type="Number" placeholder="Enter userid to delete" value={id}
        onChange={(e)=>{
         setid(e.target.value)
        }}
        />
        
        
        
        
        </>
    )
}

export default DeleteUsers