import React from 'react';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import Home from './screens/home/Home';
import { Routes, Route } from "react-router-dom";
import Sell from './screens/Sell/Sell';
import Donated from './screens/Donated/Donated';
import Profile from './screens/Profile/Profile';
import Chat from './screens/chat/Chat';
import RequestedUser from './screens/requestedUser/RequestedUser';



const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/sell' element={<Sell/>}></Route>
        <Route path='/donated' element={<Donated/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
        <Route path='/requestedUser' element={<RequestedUser/>}></Route>
    </Routes>
  )
}

export default AllRoutes