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
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [img, setImage] = useState("");
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  library.add(faSearch);

  const fetchBooks = () => {
    api.post('book/ret-book').then(response => {
      console.log(response.data);
      setBooks(response.data.books);
      setImage(response.data.img);
    });
  };

  useEffect(() => {
    if (user === null || undefined) {
      navigate("/");
    }
    fetchBooks();
  }, []);

  const handleSearch = () => {
    // Perform the search based on name and price
    // You can modify the API request according to your backend API
    api.post('book/search', { searchTerm }).then(response => {
      console.log(response.data);
      setBooks(response.data.books);
      setImage(response.data.img);
      console.log(response.data.img)
    });
  };

  return (
    <div>
      <div>
        <Navbar visibility={{ sidebar, setSidebar }} />
      </div>
      <div style={{ marginLeft: sidebar ? "230px" : "10px", paddingTop: "80px" }}>
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
              {books && books.length > 0 ? (
                books.map((book, i) => (
                  <BookCards key={i} book={book} img={img[i] ? `data:image/png;base64,${img[i]}` : ''} />
                ))
              ) : (
                <p>No books found.</p>
              )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default Home;
