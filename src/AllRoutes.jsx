import React from 'react';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import Home from './screens/home/Home';
import { Routes, Route } from "react-router-dom";
import Sell from './screens/Sell/Sell';


const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/sell' element={<Sell/>}></Route>
    </Routes>
  )
}

export default AllRoutes