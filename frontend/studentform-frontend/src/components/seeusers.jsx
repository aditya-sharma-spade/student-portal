import {useState} from 'react';

function SeeUsers(){
  const [users,setUsers]=useState([]);
  
  const handleusers= async(e)=>{
    try{
    const response= await fetch("http://localhost:3000/users/see");
    const data= await response.json();
    setUsers(data.entries)
    
    }
catch(error){
    console.log(error.message)
}
  }
return(
        <>
        <button type="button" className="otherbutton" onClick={handleusers}>
         See all users
        </button>
        {users.map((user)=>{ //here user is not defined as such, it just implemented by map
            return(
            <div key= {user.id}>
            <p>Id:{user.id}</p>
            <p> Name: {user.name} </p>
            <p> Email: {user.email} </p>
            <p>Age: {user.age}</p>
            <br />
            </div>
            )
        }
    )}
        </>
    )
}

export default SeeUsers