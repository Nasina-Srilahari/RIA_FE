import React from 'react'
import "../Sidebar/Sidebar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBagShopping, faHandHoldingDollar, faHandHoldingHand, faUser} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    library.add(faBagShopping, faHandHoldingDollar, faHandHoldingHand, faUser)
  return (
    <div className='sidebar'>
        <div>
            <div className='nav-items'>
                <FontAwesomeIcon icon="fa-solid fa-bag-shopping"/>
                <h4>Buy</h4>
            </div>
            <div className='nav-items'>
                <FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar"/>
                <h4>Sell</h4>
            </div>
            <div className='nav-items'>
                <FontAwesomeIcon icon="fa-solid fa-hand-holding-hand"/>
                <h4>Donate</h4>
            </div>
        </div>
        <div>
            <hr></hr>
            <div className='nav-items' style={{marginBottom: "20px"}}>
                <FontAwesomeIcon icon="fa-solid fa-user"/>
                <h4>Profile</h4>
            </div>
        </div>
    </div>
  )
}

export default Sidebar