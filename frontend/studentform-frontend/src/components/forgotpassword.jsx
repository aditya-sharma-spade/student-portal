import {useState } from 'react'
function Forgotpassword({gotoVerify}){
   const [phone,setphone]=useState("");
    const handlesubmit= async(e)=>{
  
     e.preventDefault()
     try{
        const response = await fetch("http://localhost:3000/auth/sendotp",
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
            body:JSON.stringify({
              phone
            })
            }
        )
        const data = await response.json();

        if(response.ok){
            gotoVerify(phone);
         }
         else{
            alert(data.message);
         }

     }
     catch(error){
        console.log(error.message)
     }
    }
    
    return(
        <>
        <input type="text" placeholder="Enter your phone number" value={phone}
        onChange={(e)=>{setphone(e.target.value)}}
        />
        <button type="submit" onClick={handlesubmit}>
         Send OTP
        </button>
        </>
    )
}
export default Forgotpassword