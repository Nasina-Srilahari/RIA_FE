import React from 'react';
import "./register.css";
import { BiLogoGmail } from "react-icons/bi"
import { AiFillLock } from "react-icons/ai"
import { BiSolidUser } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  return (
    <div className='register'>
      <div class="wrapper">

        <form action="">
          <h1>REGISTER</h1>
          <div class="input-box">
            <input type="text" placeholder="Full Name" required />
            <i><BiSolidUser /></i>
          </div>
          <div class="input-box">
            <input type="text" placeholder="Email" required />
            <i><BiLogoGmail /></i>
          </div>
          <div class="input-box">
            <input type="password" placeholder="password" required />
            <i><AiFillLock /></i>
          </div>
          <div class="input-box">
            <input type="Confirm password" placeholder="Confirm password" required />
            <i><AiFillLock /></i>
          </div>

          <button type="submit" class="btn">Register</button>
          <div class="login-link">
            <p>Have an account <a href="#" onClick={(e) => {navigate("/login")}}>Login</a> </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register