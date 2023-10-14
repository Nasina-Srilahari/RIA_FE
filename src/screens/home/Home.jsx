import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import '../home/home.css'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import BookCards from '../../components/BookCards/BookCards';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../api/api';

const Home = () => {
  const [sidebar, setSidebar] = useState(false)
  library.add(faSearch)

  const [user, setUser] = useState(localStorage.getItem("user"))
  const navigate = useNavigate()

  const [img, setImage] = useState("")
  const [books, setBooks] = useState([])

  console.log(user)

  const fetchBooks= () => {
    api.post('book/ret-book',
      ).then(response => {
      console.log(response.data)
      setBooks(response.data.books)
      setImage(response.data.img)
    })
  }

  useEffect(() => {
    if(user === null || undefined){
      navigate("/")
    }
    fetchBooks()
  },[])

  
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
            {
              books.map(function(book,i){
                return(
                  <BookCards book={book} img={`data:image/png;base64,${img[i]}`} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home