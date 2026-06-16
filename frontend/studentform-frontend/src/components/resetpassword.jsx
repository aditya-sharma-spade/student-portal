import {useState} from 'react'
function Resetpassword({gotoLogin,phone}) {
   const [newpassword,setnewpassword] =
    useState("");
const handlesubmit = async(e)=>{

   e.preventDefault();

   try{

      const response =
         await fetch(
            "http://localhost:3000/auth/resetpassword",
            {
               method:"PATCH",

               headers:{
                  "Content-Type":
                     "application/json"
               },

               body:JSON.stringify({
                  phone,
                  newpassword
               })
            }
         );

      const data =
         await response.json();

      if(response.ok){
         alert(
            "Password reset successfully"
         );

         gotoLogin();
      }
      else{
         alert(data.message);
      }

   }
   catch(error){
      console.log(error.message);
   }
};

return(
    <>
    <div className="login-container">
   <input className='login-input'
      type="password"
      placeholder="Enter new password"
      value={newpassword}
      onChange={(e)=>
         setnewpassword(
            e.target.value
         )
      }
   />

   <button className='login-btn'
      type="button"
      onClick={handlesubmit}
   >
      Reset Password
   </button>
   </div>
</>
)
}
export default Resetpassword