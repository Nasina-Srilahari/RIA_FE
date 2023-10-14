import React from 'react'
import "../BookCards/BookCards.css"
import book from "../../assets/mfs.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart} from "@fortawesome/free-solid-svg-icons";

const BookCards = (props) => {
    library.add(faHeart)

    const handleColorChange = (e) => {
        var fav = e.target
        console.log(fav)
        if(fav!=null){
            var color = fav.style.color
            if(color == "gray"){
                fav.style.color = "red"
            }
            else{
                fav.style.color = "gray"
            }

        }
    }

    var percentage = ((parseInt(props.book.actual_price) - parseInt(props.book.selling_price))/parseInt(props.book.actual_price))*100
  return (
    <div className='book-card'>
        <span className='favourites' onClick={handleColorChange}><FontAwesomeIcon icon="fa-solid fa-heart" id='fav'/></span>
        <div className='book-img-div'>
            <img src={props.img} />
        </div>
        <div className='book-card-content'>
            <h3>{props.book.book_name}</h3>
            <p className='price-details'><del>Rs.{props.book.actual_price} </del> <span> Rs.{props.book.selling_price} <br/>{percentage}% Off</span></p>
            <center>
                <div className='btns-div'>
                    <button>Buy Now</button>
                    <button>Add to Cart</button>
                </div>
            </center>
        </div>
    </div>
  )
}

export default BookCards