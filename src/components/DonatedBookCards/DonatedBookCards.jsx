import React, { useState, useEffect } from 'react';
import "./donatedBookCards.css"
import book from "../../assets/mfs.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart} from "@fortawesome/free-solid-svg-icons";
import Donated from './../../screens/Donated/Donated';
import api from '../../api/api';


const DonatedBookCards = (props) => {
    library.add(faHeart)
    const [visible, setVisible] = useState(false);
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
    

  return (
    <>
    <div className='dobated-book-card'>
    <span className="favourites" onClick={handleColorChange} >
        <FontAwesomeIcon icon="fa-solid fa-heart" id="fav" style={{ color: isFavorite ? 'red' : 'gray' }}/>
      </span>
      <div className="book-img-div">
        <img src={props.img} alt="Book Cover" />
      </div>
        <div className='dobated-book-card-content'>
            <h3>{props.book.book_name}</h3>
            <p className='dobated-price-details'><del>Rs.{props.book.actual_price}</del> <span> FREE</span></p>
            <center>
                <div className='dobated-btns-div'>
                    <button onClick={()=>{ props.setSellerEmail.setSellerEmail(props.book.seller_email); props.visibility.setVisible(true); }}>Request Book</button>
                </div>
            </center>
        </div>
    </div>
    </>
  )
}

export default DonatedBookCards