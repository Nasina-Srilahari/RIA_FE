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


const Donated = (props) => {
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

    // Function to group books by category
  const groupBooksByCategory = (books) => {
    const groupedBooks = {};
    books.forEach((book) => {
      if (!groupedBooks[book.category]) {
        groupedBooks[book.category] = [];
      }
      groupedBooks[book.category].push(book);
    });
    return groupedBooks;
  };

  // Group books by category
  const groupedBooks = groupBooksByCategory(books);



  return (
<div>
      <div>
        <Navbar visibility={{sidebar, setSidebar}}/>
      </div>
      <div style={{marginLeft: sidebar === true ? "230px" : "10px", paddingTop: "80px"}}>
        <div className='search-div'>
          <input
            className='search-bar'
            id='search-bar'
            name='search-bar'
            placeholder='Search....'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {if(e.key === 'Enter'){handleSearch()}}}
          />
          <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
          {/* <button className="search-btn" onClick={handleSearch}>Search</button> */}
          {Object.entries(groupedBooks).map(([category, booksInCategory]) => (
            <div key={category}>
            <h2 style={{ textAlign: "left", margin: "20px" }}>{category}</h2>
              <div className='books-cards-buy-wrapper'>
                {/* Iterate over books in the current category */}
                {booksInCategory.map((book, i) => (
                  <DonatedBookCards
                  key={i}
                  visibility={{visible, setVisible}}
                  book={book}
                  img={`data:image/png;base64,${img[i]}`}
                  setSellerEmail={setSellerEmail}
                    />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <>
      {/* <CModal
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
          >
          <CModalHeader>
            <CModalTitle id="request-book-alert">Request Book</CModalTitle>
          </CModalHeader>
          <CModalBody>
          {books && (
            <table className='profile-table'>
              <tbody>
                <tr>
                  <div className="book-img-div dialogbox">
                    <img src={img} alt="Book Cover" style={{ width: '130px', height: '130px', borderRadius: '9px', justifyContent:'center' }} />
                  </div>
                </tr>
                <tr>
                  <td className='profile-lable'>Book Name</td>
                  <td>:</td>
                  <td className='profile-detail'>{books.book_name}</td>
                </tr>
                <tr>
                  <td className='profile-lable'>Author</td>
                  <td>:</td>
                  <td className='profile-detail'>{ books.author}</td>
                </tr>
                <tr>
                  <td className='profile-lable'>Actual Price</td>
                  <td>:</td>
                  <td className='profile-detail'>{  books &&   books.actual_price}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Selling Price</td>
                  <td>:</td>
                  <td className='profile-detail'>{  books &&   books.selling_price}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Status</td>
                  <td>:</td>
                  <td className='profile-detail'>{  books &&   books.status}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Date Posted</td>
                  <td>:</td>
                  <td className='profile-detail'>{  books &&   books.postedOn}</td>
                </tr>
              </tbody>
            </table>
          )}
          <hr></hr>
              To get the donated book you need to send an email to the donar which contains the <strong>Valid reason</strong> to request for donated book along with the <strong>proof</strong> as attanchment.
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={sendEmailToSeller} >Send Mail</CButton>
          </CModalFooter>
      </CModal> */}
      </>
  </div>
  )
}

export default Donated