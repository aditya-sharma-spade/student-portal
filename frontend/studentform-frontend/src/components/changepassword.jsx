import {useState} from 'react'
function Changepassword(){
    const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");

  const handlesubmit = async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem("token");
    try{
      const response= await fetch("http://localhost:3000/auth/changepassword",
        {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({
                oldpassword,
                newpassword
            })
        }
      )
      const data = await response.json()
      if(response.ok){
        alert(data.message)
        setoldpassword("")
        setnewpassword("")
      }
    }
    catch(error){
        console.log(error.message)
    }
  }
  return(
    <>
    <div className="login-container">
      <input
            type="password"
            value={oldpassword}
            placeholder="Enter your old password"
            className='login-input'
            onChange={(e) =>
              setoldpassword(e.target.value)
            }
          />
      <input
            type="password"
            placeholder="Enter your new password"
            className='login-input'
            value={newpassword}
            onChange={(e) =>
              setnewpassword(e.target.value)
            }
          />
        <button type="submit" onClick={handlesubmit} className='login-btn'>
            Submit
        </button>


    </div>
    </>
  )
}
export default Changepassword;