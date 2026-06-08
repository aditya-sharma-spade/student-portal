import {useState,useEffect} from 'react';
import UpdateDetails from './updatedetails';
function SeeUsers({gotoadd}){
  const [users,setUsers]=useState([]);
 const[selecteduser,setselecteduser]=useState(null);
  
  const handleusers= async()=>{
    const token =
    localStorage.getItem("token");
    try{
    const response= await fetch("http://localhost:3000/students/see",{
    headers:{
         Authorization:
            `Bearer ${token}`
      }})
    const data= await response.json();
    setUsers(data.entries)
    
    }
catch(error){
    console.log(error.message)
    
}
  }
  useEffect(()=>{     //this means that everytime the component seeusers appears, call this function
    
    handleusers();
  },[])
  const handledelete= async(id)=>{
     const token =
    localStorage.getItem("token");
    try{
     const response= await fetch( `http://localhost:3000/students/delete/${id}`,
        
        { headers: {
        "Content-Type": "application/json",
        Authorization:
            `Bearer ${token}`
       },
            method:"DELETE"
        }
     )
     const data= await response.json()
     await handleusers();
    }
    catch(error){
      console.log(error.message)
    }
  }

return(
        <>
        <button className="adduser" onClick={gotoadd}>
            Add Students
        </button>
          {selecteduser && (
      <UpdateDetails user={selecteduser} refreshusers={handleusers}/>
    )}
        
        
        <table>
         <thead>
         <tr>
            <th> Id</th>
            <th> Name</th>
            <th> Age</th>
            <th> Email</th>
            <th>Action</th>
         </tr>
         </thead>
       <tbody>


       
        {users.map((user)=>{ //here user is not defined as such, it just implemented by map
            return(
            <tr key= {user.id}>
            <td>{user.id}</td>
            <td> {user.name} </td>
            <td> {user.age} </td>
            <td>{user.email}</td>
            <td> <button className="action-btn" onClick={()=>setselecteduser(user)}>Edit</button>
             <button className="delete-btn" onClick={()=>handledelete(user.id)}>Delete</button></td>
            </tr>
            )
        }
    )}
</tbody>
</table>
        </>
    )
}

export default SeeUsers