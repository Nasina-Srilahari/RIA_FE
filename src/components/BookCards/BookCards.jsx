import React, { useState, useEffect } from 'react';
import './BookCards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle } from '@coreui/react';
import api from '../../api/api';

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

  const handleBuyNowClick = () => {
    setVisible(true);
  };

  const handleCloseChatModal = () => {
    setChatVisible(false);
  };

  const percentage = ((parseInt(props.book.actual_price) - parseInt(props.book.selling_price)) / parseInt(props.book.actual_price)) * 100;

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
          <del>Rs.{props.book.actual_price} </del> <span> Rs.{props.book.selling_price} <br />{percentage}% Off</span>
        </p>
        <center>
          <div className="btns-div">
            <button onClick={handleBuyNowClick}>Chat</button>
          </div>
        </center>
      </div>

      {/* Chat Modal */}
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle id="request-book-alert">Contact Seller</CModalTitle>
        </CModalHeader>
        <CModalBody>
          To get the book, you can directly chat with the seller.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Chat</CButton>
        </CModalFooter>
      </CModal>

      {/* Chat Component */}
      {isChatVisible}
    </div>
  );
};

export default BookCards;
