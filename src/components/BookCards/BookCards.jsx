import React, { useState, useEffect } from 'react';
import './BookCards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle } from '@coreui/react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

library.add(faHeart);

const BookCards = (props) => {
  const [visible, setVisible] = useState(false);
  const [isChatVisible, setChatVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user ID from local storage
    const storedUser = localStorage.getItem('user');
    if (localStorage.getItem('user')) {
      const user = JSON.parse(storedUser);
      setUserId(storedUser);
      // Check if the book is in the user's favorites
      const check = user.favorites.includes(props.book._id)
      setIsFavorite(check);
      console.log(user.favorites.includes(props.book._id))
    }

  }, [props.book._id]);



  const handleColorChange = async (e) => {
    const fav = e.target;
    if (fav !== null) {
      // Add or remove from favorites
      try {
        if (isFavorite) {
          // Remove from favorites API
          console.log(userId)
          await api.post('book/removeFavorite', { bookId: props.book._id, user: JSON.parse(localStorage.getItem('user')) })
            .then(response => {
              setIsFavorite(false);
              localStorage.setItem('user', JSON.stringify(response.data.user));
            });
        } else {
          // Check if userId is available before making the API call
          if (userId) {
            // Add to favorites API
            await api.post('book/addFavorite', { bookId: props.book._id, user: JSON.parse(localStorage.getItem('user')) })
              .then(response => {
                setIsFavorite(true);
                localStorage.setItem('user', JSON.stringify(response.data.user));
              });
          }
        }
      } catch (error) {
        console.error('Error adding/removing from favorites:', error);
        // Handle error as needed
      }
    }
  };

  const handleChatClick = () => {
    setVisible(true);
  };

  const handleCloseChatModal = () => {
    setChatVisible(false);
  };

  const formatDate = (timestamp) => {

    const date = new Date(timestamp);
    const added_date = new Date(date.getTime() + 1000 * 60 * 30 * 11);

    const formattedDate = added_date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC', 
    });

    return formattedDate
}

  const percentage = ((parseInt(props.book.actual_price) - parseInt(props.book.selling_price)) / parseInt(props.book.actual_price)) * 100;
  const roundedPercentage = Number.isInteger(percentage) ? percentage : percentage.toFixed(2);

  return (
    <div className="book-card">
      <span className="favourites" onClick={handleColorChange} >
        <FontAwesomeIcon icon="fa-solid fa-heart" id="fav" style={{ color: isFavorite ? 'red' : 'gray' }}/>
      </span>
      <div className="book-img-div">
        <img src={props.img} alt="Book Cover" />
      </div>
      <div className="book-card-content">
        <h3>{props.book.book_name}</h3>
        <p className="price-details">
          <del>Rs.{props.book.actual_price} </del> <span> Rs.{props.book.selling_price} <br />{roundedPercentage}% Off</span>
        </p>
        <center>
          <div className="btns-div">
            <button onClick={() => handleChatClick()}>Chat</button>
          </div>
        </center>
      </div>

      {/* Chat Modal */}
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader className="modal-header book">
          <CModalTitle className="modal-title book" id="request-book-alert">Contact Seller</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {props.book && (
            <table className='profile-table'>
              <tbody>
                <tr>
                  <div className="book-img-div dialogbox">
                    <img src={props.img} alt="Book Cover" style={{ width: '130px', height: '130px', borderRadius: '9px', justifyContent:'center' }} />
                  </div>
                </tr>
                {/* Add details similar to your modalBody */}
                <tr>
                  <td className='profile-lable'>Book Name</td>
                  <td>:</td>
                  <td className='profile-detail'>{props.book.book_name}</td>
                </tr>
                <tr>
                  <td className='profile-lable'>Author</td>
                  <td>:</td>
                  <td className='profile-detail'>{props.book.author}</td>
                </tr>
                <tr>
                  <td className='profile-lable'>seller name</td>
                  <td>:</td>
                  <td className='profile-detail'>{props.book.seller_name}</td>
                </tr>
                <tr>
                  <td className='profile-lable'>Actual Price</td>
                  <td>:</td>
                  <td className='profile-detail'>{props.book && props.book.actual_price}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Selling Price</td>
                  <td>:</td>
                  <td className='profile-detail'>{props.book && props.book.selling_price}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Status</td>
                  <td>:</td>
                  <td className='profile-detail'>{props.book && props.book.status}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Category</td>
                  <td>:</td>
                  <td className='profile-detail'>{props.book && props.book.category}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Date Posted</td>
                  <td>:</td>
                  <td className='profile-detail'>{props.book && formatDate(props.book.postedOn)}</td>
                </tr>
              </tbody>
            </table>
          )}
          <hr></hr>
          To get the book, you can directly chat with the seller.
        </CModalBody>
        <CModalFooter className="modal-footer">
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" >
            <Link to='/chat' state={{ receiver: props.book.seller_name }} style={{textDecoration: 'none', color: 'white'}}>
              Chat
            </Link>
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Chat Component */}
      {isChatVisible}
    </div>
  );
};

export default BookCards;
