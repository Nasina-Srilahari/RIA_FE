
import React from 'react'
import "../Navbar/Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRightFromBracket, faBars} from "@fortawesome/free-solid-svg-icons";
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const Navbar = (props) => {
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    library.add(faRightFromBracket,faBars)
    const navigate = useNavigate()
    const user_obj = JSON.parse(localStorage.getItem("user"))
    var user = ""
    if(user_obj != null || undefined){
        user = user_obj.name.toUpperCase()
    }

    // const handleLogout = () => {
    //     localStorage.clear()
    //     navigate("/")
    // }

    const handleLogout = () => {
        setLogoutModalOpen(true);
      };
    
      const confirmLogout = () => {
        localStorage.clear();
        navigate('/');
      };
    
      const cancelLogout = () => {
        setLogoutModalOpen(false);
      };


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
                    <h3 className='profile' onClick={() => navigate('/profile')}>{user[0]}</h3>
                    <button><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" onClick={handleLogout} /></button>
                </div>
            </div>
        </div>
        {props.visibility.sidebar === true ? <Sidebar/> : <></>}
        <LogoutModal isOpen={logoutModalOpen} onCancel={cancelLogout} onLogout={confirmLogout} />
    </div>
  )
}


const LogoutModal = ({ isOpen, onCancel, onLogout }) => {
  return (
    <Modal isOpen={isOpen} toggle={onCancel} className="modal-dialog modal-dialog-centered">
      <ModalHeader className="custom-modal-header model-header">
        Confirm Logout
      </ModalHeader>
      <ModalBody>
        Are you sure you want to logout?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={onLogout}>
          Logout
        </Button>
      </ModalFooter>
    </Modal>
  );
};




export default Navbar;
