import { useEffect } from 'react';
import {useState} from 'react'
function Studentprofile(){
    
  const [data,setdata]=useState(null);
    
   const token =
    localStorage.getItem("token");
  const fetchprofile = async()=>{
    const response= await fetch("http://localhost:3000/students/seeme" ,
        {  method:"GET",
            headers:{
            Authorization:`Bearer ${token}`
        },
        })
        const result = await response.json()
        setdata(result);
    }

    useEffect(()=>{fetchprofile()},[])
 if(!data){
    return <p>Loading...</p>;
  }

        return(
         <>
         <h2> Your details</h2>
         <p>
            Name: {data.name}
            <br />
            Email: {data.email}
            <br />
             Phone: {data.phone}
            <br />
             Age: {data.age}
            <br />
             Course: {data.course}
            
         </p>
         </>
        )
         
    }


export default Studentprofile;