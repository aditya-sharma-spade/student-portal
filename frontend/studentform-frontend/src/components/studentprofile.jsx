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
         <table className='profile-table'><thead></thead>
            <tbody>
            <tr><th>Name:</th> <td>{data.name}</td></tr>
           
            <tr><th>Email:</th><td> {data.email}</td></tr>
            
             <tr><th>Phone:</th><td> {data.phone}</td></tr>
            
             <tr><th>Age:</th><td> {data.age}</td></tr>
            
             <tr><th>Course:</th><td> {data.course}</td></tr>
            </tbody>
        
         </table>
         </>
        )
         
    }


export default Studentprofile;