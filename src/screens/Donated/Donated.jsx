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
import api from '../../api/api';


const Donated = () => {
  const [sidebar, setSidebar] = useState(false)
  const [visible, setVisible] = useState(false)
  library.add(faSearch)

  const [books, setBooks] = useState([])
  const [img, setImage] = useState()
  const [sellerEmail, setSellerEmail] = useState("seller@gmail.com")
  const [user, setUser] = useState(localStorage.getItem("user"))

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // New loading state
  const [noBooksFound, setNoBooksFound] = useState(false);

  const navigate = useNavigate()

  const fetchBooks= () => {
    setLoading(true); // Set loading to true when fetching starts
    api.post('book/ret-book-donated').then(response => {
      console.log(response.data);
      setBooks(response.data.books);
      setImage(response.data.img);
      setLoading(false); // Set loading to false when fetching is complete
    });
  }

  const handleSearch = () => {
    setLoading(true);
    if (searchTerm.trim() === "") {
      // If search box is empty, fetch all books
      fetchBooks();
    } else {
      // Perform the search based on the entered term
      api.post('book/search', { searchTerm }).then(response => {
        console.log(response.data);
        setBooks(response.data.books);
        setImage(response.data.img);
        setLoading(false);
        setNoBooksFound(response.data.books.length === 0);
      });
    }
  };


  useEffect(() => {
    if(user === null || undefined){
      navigate("/")
    }
    fetchBooks()
  },[])

  const sendEmailToSeller = () => {

    console.log(sellerEmail)
  
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
      <div style={{marginLeft: sidebar === true ? "230px" : "10px", paddingTop: "80px"}}>
        <div className='search-div'>
          <FontAwesomeIcon icon={faSearch} />
          <input
            className='search-bar'
            id='search-bar'
            name='search-bar'
            placeholder='Search....'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
          <div className='books-cards-buy-wrapper'>
            {loading ? (
              <p>Loading...</p>
            ) : books.length > 0 ? (
              books.map((book, i) => (
                <DonatedBookCards
                  key={i}
                  visibility={{visible, setVisible}}
                  book={book}
                  img={`data:image/png;base64,${img[i]}`}
                  setSellerEmail={{sellerEmail, setSellerEmail}}
                />
              ))
            ) : noBooksFound ? (
              <p>No books found.</p>
            ) : null}
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