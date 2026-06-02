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
    setid("");
}



catch(error){
console.log(error.message)
}
}

    return(
        <>
         <div>
        <input  type="Number" placeholder="Enter userid to delete" value={id} 
        onChange={(e)=>{
         setid(e.target.value)
        }}
        />
          <button type="button" onClick={handledelete} className="otherbutton">Delete data</button>
        </div>
        
        
        </>
    )
}

export default DeleteUsers