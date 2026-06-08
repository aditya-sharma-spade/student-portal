import {useState} from 'react'

function Login({onLogin,gotoRegister}){
   const [email,setemail] = useState("");
const [password,setpassword] = useState("");
    const handlelogin= async ()=>{
        try{
const response = await fetch( "http://localhost:3000/auth/login",
{
    method:"POST",

headers:{
    "Content-Type":"application/json"
},
body:JSON.stringify({
  email,
password
})}
)
     const data= await response.json()
     if(data.token){
     localStorage.setItem(
        "token", data.token
     )
     onLogin();
}
else{
    alert(data.message)
}}
        catch(error){
console.log(error.message);
        }
    }


return (
    <>
    <div className="login-container">
        <h1>Login</h1>
    <input type="text" placeholder="Enter your email" value={email} className="login-input"
    onChange={(e)=>{
      setemail(e.target.value)
    }}
    />
    <input type="password" placeholder="Enter your password" value={password} className="login-input"
    onChange={(e)=>{
       setpassword(e.target.value)
    }}
    />
    <button type="Submit" onClick={handlelogin} className="login-btn">
        Login
    </button>
    <button type="button"  className="register-btn" onClick={()=>gotoRegister()}>
        Don't have an account? Register
    </button>
    </div>
    </>
   
   )
}
export default Login;