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
     <h2> My Hostel details</h2>
     <table className='profile-table'>
        <thead></thead>
        <tbody>
     <tr><th>Studentid:</th><td> {data.studentid}</td></tr>
     <tr><th>Hostel:</th><td>{data.hostel}</td></tr>
      <tr><th> Room Number:</th><td> {data.roomNumber}</td></tr>
      <tr><th>Date Allocated:</th><td> {data.dateAllocated}</td></tr>
       
      </tbody></table>
     </>
    )
}

export default Hosteldetails