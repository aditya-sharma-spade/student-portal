import {useState } from 'react'
function VerifyOtp({gotoReset,phone}){
  
    const[otp,setotp]=useState("");
   const handlesubmit= async(e)=>{
  
     e.preventDefault()
     try{
        const response = await fetch("http://localhost:3000/auth/verifyotp",
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
            body:JSON.stringify({
              phone,
              otp
            })
            }
        )
        const data = await response.json();

        if(response.ok){
            gotoReset();
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
      

         <input type="text" placeholder="Enter your OTP" value={otp}
        onChange={(e)=>{setotp(e.target.value)}}
        />
        <button type="submit" onClick={handlesubmit}>
         Verify OTP
        </button>
        </>
    )
}
export default VerifyOtp