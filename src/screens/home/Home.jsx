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

const Home = () => {
  const [sidebar, setSidebar] = useState(false)
  library.add(faSearch)

  const [user, setUser] = useState(localStorage.getItem("user"))
  const navigate = useNavigate()

  console.log(user)

  useEffect(() => {
    if(user === null || undefined){
      navigate("/")
    }
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
            <BookCards/>
            <BookCards/>
            <BookCards/>
            <BookCards/>
            <BookCards/>
            <BookCards/>
            <BookCards/>
            <BookCards/>
            <BookCards/>
            <BookCards/>
            <BookCards/>
            <BookCards/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home