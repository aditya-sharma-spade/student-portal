import {useState,useEffect} from 'react'

 function Hosteldetails(){

const[data,setdata]=useState(null)
 const [loading,setLoading] =
   useState(true);
const fetchhosteldetails = async()=>{
    
    const token = localStorage.getItem("token");
    const response= await fetch("http://localhost:3000/hostel/myhostel" ,
        {
            method:"GET",
            headers:{
            Authorization:`Bearer ${token}`
        },
    }
        )
        const result = await response.json()
        console.log(result)
        setdata(result.entries || null)
        setLoading(false)
    }
    useEffect(()=>{
            fetchhosteldetails()
        },[])
      if(loading){
   return <p>Loading...</p>;
}

if(data === null){
   return <p>No hostel record found</p>;
}
    return(
     <>
     <h2> Hostel details</h2>
     <p>Studentid: {data.studentid}</p>
     <p>Hostel:{data.hostel}</p>
      <p> Room Number: {data.roomNumber}</p>
      <p>Date Allocated: {data.dateAllocated}</p>
      
     </>
    )
}

export default Hosteldetails