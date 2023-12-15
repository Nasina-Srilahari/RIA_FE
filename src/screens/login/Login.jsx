import React, {useState} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'
import LoginImage from '../../assets/login.svg'
import NavAuth from './../../components/NavAuth/NavAuth';

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleLogin = (e) => {
    e.preventDefault()
    api.post('user/login',{email,password})
    .then(response => {
      console.log(response.data)
      localStorage.setItem("user", JSON.stringify(response.data.result))
      localStorage.setItem("token",response.data.token)
      navigate("/home")
    })
    .then(error => {
      console.log(error)
    })
  }

  return (
    <div>
      <div>
        <NavAuth />
      </div>
      <div className="login-parts">
        <div className="image-login">
          <img className="image-l" src={LoginImage}/>
        </div>
        <div className='login'>
          <div className="wrapper">
            <form onSubmit={handleLogin} autocomplete="on">
              <h1>Login</h1>
              <div className="input-box">
                <input type="text" placeholder="Email" required onChange={(e) => {setEmail(e.target.value)}} autocomplete="username" />
                <i className='bx bxs-user'></i>
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required onChange={(e) => {setPassword(e.target.value)}} autocomplete="current-password"/>
                <i className='bx bxs-lock-alt' ></i>
              </div>
              {/* <div className="remember-forgot">
                <label><input type="checkbox"/>Remember Me </label>
                <a href="a">ForgotPassword</a>
              </div> */}
              <button type="submit" className="btn">Login</button>
              <div className="register-link">
                <p>Don't have an account? <a onClick={(e) => {navigate("/register")}} >Register</a></p>
              </div>
            </form>
              
            </div>
        </div>
      </div>
    </div>

  )
}

export default Login