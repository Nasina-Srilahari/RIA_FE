import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './donated.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import DonatedBookCards from '../../components/DonatedBookCards/DonatedBookCards';
import { useNavigate } from 'react-router-dom';
import Sidebar from './../../components/Sidebar/Sidebar';
import { Alert, CModal, CModalHeader, CModalBody, CModalFooter,CButton, CModalTitle } from '@coreui/react';


const Donated = () => {
  const [sidebar, setSidebar] = useState(false)
  const [visible, setVisible] = useState(false)
  library.add(faSearch)


  const sellerEmail = "seller@gmail.com"; // Replace with the actual seller's email

  const sendEmailToSeller = () => {
  
    const subject = "Request for Donated Book";
    const body = "I am writing to request the donated book. Please find the attached proof for your reference.";
  
    const gmailComposeUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(sellerEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; 
    window.open(gmailComposeUrl, '_blank');
  };

  return (
    <div>
      <div>
        <Navbar visibility={{sidebar, setSidebar}}/>
      </div>
      <div style={{marginLeft: sidebar == true ? "230px" : "10px", paddingTop: "80px"}}>
        <div className='search-div'>
          <FontAwesomeIcon icon="fa-solid fa-search"/>
          <input className='search-bar' id='search-bar' name='search-bar' placeholder='Search....'/>
          <div className='books-cards-buy-wrapper'>
            <DonatedBookCards visibility={{visible, setVisible}} />
            <DonatedBookCards visibility={{visible, setVisible}} />
            <DonatedBookCards visibility={{visible, setVisible}} />
          </div>
        </div>
      </div>
      <>
      <CModal
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
          >
          <CModalHeader>
            <CModalTitle id="request-book-alert">Request Book</CModalTitle>
          </CModalHeader>
          <CModalBody>
              To get the donated book you need to send an email to the donar which contains the <strong>Valid reason</strong> to request for donated book along with the <strong>proof</strong> as attanchment.
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={sendEmailToSeller} >Send Mail</CButton>
          </CModalFooter>
      </CModal>
      </>
  </div>
  )
}

export default Donated