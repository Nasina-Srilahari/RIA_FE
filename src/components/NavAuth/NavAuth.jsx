import React from 'react'
import "../NavAuth/NavAuth.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRightFromBracket, faBars} from "@fortawesome/free-solid-svg-icons";
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavAuth = () => {
    // library.add(faRightFromBracket,faBars)
    // const navigate = useNavigate()
    // const user_obj = JSON.parse(localStorage.getItem("user"))
    // var user = ""
    // if(user_obj != null || undefined){
    //     user = user_obj.name.toUpperCase()
    // }


  return (
    <div>
        <div className='navbar'>
            <div className='navbar-content'>
                <div className='logo-name'>
                    {/* <span className='toggle-sidebar' onClick={(e)=>{props.visibility.setSidebar(!props.visibility.sidebar)}}><FontAwesomeIcon icon="fa-solid fa-bars"/></span> */}
                    <h3 className='logo'>RIA</h3>
                    <h2 className='main-name'>Read It Again</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavAuth