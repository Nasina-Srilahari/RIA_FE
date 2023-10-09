import React from 'react'
import "../Navbar/Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRightFromBracket, faBars} from "@fortawesome/free-solid-svg-icons";
import Sidebar from '../Sidebar/Sidebar';

const Navbar = (props) => {
    library.add(faRightFromBracket,faBars)
  return (
    <div>
        <div className='navbar'>
            <div className='navbar-content'>
                <div className='logo-name'>
                    <span className='toggle-sidebar' onClick={(e)=>{props.visibility.setSidebar(!props.visibility.sidebar)}}><FontAwesomeIcon icon="fa-solid fa-bars"/></span>
                    <h3 className='logo'>RIA</h3>
                    <h2 className='main-name'>Read It Again</h2>
                </div>
                <div className='user-options'>
                    <h3 className='profile'>U</h3>
                    <button><FontAwesomeIcon icon="fa-solid fa-right-from-bracket"/></button>
                </div>
            </div>
        </div>
        {props.visibility.sidebar === true ? <Sidebar/> : <></>}
    </div>
  )
}

export default Navbar