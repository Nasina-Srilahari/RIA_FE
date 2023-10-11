import React from 'react';
import "./register.css";
import { BiLogoGmail } from "react-icons/bi"
import { AiFillLock } from "react-icons/ai"
import { BiSolidUser } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useState } from 'react';

const Register = () => {

  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("func")
    api.post(`user/signup`,{name,username,email,password}).then(response => {
      console.log(response)
      localStorage.setItem("user", JSON.stringify(response.data.result))
      localStorage.setItem("token",response.data.token)
      navigate("/home")
    }).then(error => {
      console.log(error)
    })
  }
  return (
    <div className='register'>
      <div class="wrapper">

        <form onSubmit={submitHandler}>
          <h1>REGISTER</h1>
          <div class="input-box">
            <input type="text" placeholder="Full Name" required onChange={(e) => {setName(e.target.value); setUsername(e.target.value)}}/>
            <i><BiSolidUser /></i>
          </div>
          <div class="input-box">
            <input type="text" placeholder="Email" required onChange={(e) => {setEmail(e.target.value)}} />
            <i><BiLogoGmail /></i>
          </div>
          <div class="input-box">
            <input type="password" placeholder="password" required onChange={(e) => {setPassword(e.target.value)}} />
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