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
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const Register = () => {

  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [image, setImage] = useState();
  const [img, setImg] = useState();
  const [alertMessage, setAlertMessage] = useState(null); 
  const [alertType, setAlertType] = useState(null);

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
      console.log(response);
        if (response.status === 200) {
          setAlertMessage('Registered Successfully, Wait until Verified by admin');
          setAlertType('success');
          // Clear form fields after successful upload
          // Clearing logic...
        } else {
          setAlertMessage('Error in Registration. Please try again.');
          setAlertType('error');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setAlertMessage('Error in Registration. Please try again.');
        setAlertType('error');
      });
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
            {alertMessage && <AlertMessage message={alertMessage} type={alertType} />}<br/>
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