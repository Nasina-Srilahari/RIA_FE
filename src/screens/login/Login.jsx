import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  return (
  
    <div className='login'>
      <div className="wrapper">
        <form action="" >
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required/>
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required/>
            <i className='bx bxs-lock-alt' ></i>
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox"/>Remember Me </label>
            <a href="a">ForgotPassword</a>
          </div>
          <button type="submit" className="btn" onClick={() => {navigate("/")}}>Login</button>
          <div className="register-link">
            <p>Don't have an account? <a onClick={(e) => {navigate("/register")}} >Register</a></p>
          </div>
        </form>
          
        </div>
    </div>

  )
}

export default Login