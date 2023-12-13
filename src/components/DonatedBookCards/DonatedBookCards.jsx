import React from 'react'
import "./donatedBookCards.css"
import book from "../../assets/mfs.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart} from "@fortawesome/free-solid-svg-icons";
import Donated from './../../screens/Donated/Donated';



const DonatedBookCards = (props) => {
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

  return (
    <>
    <div className='dobated-book-card'>
        <span className='favourites' onClick={handleColorChange}><FontAwesomeIcon icon="fa-solid fa-heart" id='fav'/></span>
        <div className='dobated-book-img-div'>
            <img src={props.img} />
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