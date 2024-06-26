import React from 'react'
import "../Sidebar/Sidebar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBagShopping, faHandHoldingDollar, faHandHoldingHand, faUser, faComment, faPersonCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    library.add(faBagShopping, faHandHoldingDollar, faHandHoldingHand, faUser, faComment, faPersonCircleQuestion)

    const navigate= useNavigate();
    const usertype = JSON.parse(localStorage.getItem('user')).usertype
  return (
    <div className='sidebar'>
        <div>
            <div className='nav-items' onClick={()=>{navigate("/home")}}>
                <FontAwesomeIcon icon="fa-solid fa-bag-shopping"/>
                <h4>Buy</h4>
            </div>

            <div className='nav-items' onClick={()=>{navigate("/donated")}}>
                <FontAwesomeIcon icon="fa-solid fa-hand-holding-hand"/>
                <h4>Donated Books</h4>
            </div>

            <div className='nav-items' onClick={()=>{navigate("/sell")}}>
                <FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar"/>
                <h4>Sell/Donate</h4>
            </div>

            {usertype === "admin" && (<div className='nav-items' onClick={()=>{navigate("/requestedUser")}}>
                <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
                <h4>RequestedUser</h4>
            </div>)}

        </div>
        <div>
            <hr></hr>
            <div className='nav-items' style={{marginBottom: "5px"}} onClick={()=>{navigate("/chat")}}>
                <FontAwesomeIcon icon="fa-solid fa-comment" />
                <h4>Chat</h4>
            </div>
            <div className='nav-items' style={{marginBottom: "20px"}} onClick={()=>{navigate("/profile")}}>
                <FontAwesomeIcon icon="fa-solid fa-user"/>
                <h4>Profile</h4>
            </div>
        </div>
    </div>
  )
}

export default Sidebar