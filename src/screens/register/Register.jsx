import React from 'react';
import "./register.css";
import { BiLogoGmail } from "react-icons/bi"
import { AiFillLock } from "react-icons/ai"
import { BiSolidUser } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useState } from 'react';
import NavAuth from './../../components/NavAuth/NavAuth';
import RegisterImage from '../../assets/register.svg'

const Register = () => {

  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [image, setImage] = useState();
  const [img, setImg] = useState();

  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("func")
    api.post(`user/signup`,
    {name,username,email,password,usertype:"normal", verified:"notverified",img},
    {
      headers: { 'Content-Type':"multipart/form-data"}
    }
    ).then(response => {
      console.log(response)
      // localStorage.setItem("user", JSON.stringify(response.data.result))
      // localStorage.setItem("token",response.data.token)
      // navigate("/home")
    }).then(error => {
      console.log(error)
    })
  }
  return (
  <div>
    <div>
    <NavAuth />
    </div>
    <div className="register-parts">
      <div className="image-register">
        <img className="image-r" src={RegisterImage}/>
      </div>
      <div className='register'>
        <div class="wrapper">
          <form onSubmit={submitHandler}>
            <h1>Register</h1>
            <div class="input-box">
              <input type="text" placeholder="Full Name" required onChange={(e) => {setName(e.target.value); setUsername(e.target.value)}}/>
              <i><BiSolidUser /></i>
            </div>
            <div class="input-box">
              <input type="text" placeholder="Email" required onChange={(e) => {setEmail(e.target.value)}} />
              <i><BiLogoGmail /></i>
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password" required onChange={(e) => {setPassword(e.target.value)}} />
              <i><AiFillLock /></i>
            </div>
            <div class="input-box">
              <input type="Confirm password" placeholder="Confirm Password" required />
              <i><AiFillLock /></i>
            </div>
            <div>
              <input type="file" onChange={(e) => { setImage(URL.createObjectURL(e.target.files[0])); setImg(e.target.files[0]) }} required />
              <img className="book-img" src={image} />
            </div>
            <button type="submit" class="btn">Register</button>
            <div class="login-link">
              <p>Have an account? <a href="#" onClick={(e) => {navigate("/")}}>&nbsp;Login</a> </p>
            </div>
          </form>
        </div>
      </div>
    </div>  
  </div>    
  )
}

export default Register