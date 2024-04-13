import React, { useState, useEffect } from 'react';
import './home.css'; // Assuming this is your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import BookCards from '../../components/BookCards/BookCards';
import Navbar from '../../components/Navbar/Navbar';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Assuming you're using Reactstrap
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [img, setImage] = useState({});
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [Bookmodal, setBookModal] = useState(false); // New modal state
  const [modal, setModal] = useState(false); // New modal state
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();

  library.add(faSearch);

  const fetchBooks = () => {
    setLoading(true);
    api.post('book/ret-book').then(response => {
      console.log(response.data);
      setBooks(response.data.books);
      const imageMap = {};
      response.data.books.forEach((book, index) => {
        imageMap[book._id] = response.data.img[index] ? `data:image/png;base64,${response.data.img[index]}` : '';
      });
      setImage(imageMap);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (user === null || undefined) {
      navigate("/");
    }
    fetchBooks();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    if (searchTerm.trim() === "") {
      fetchBooks();
    } else {
      api.post('book/search', { searchTerm }).then(response => {
        console.log(response.data);
        setBooks(response.data.books);
        setImage(response.data.img);
        setLoading(false);
      });
    }
  };

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
        <Navbar visibility={{ sidebar, setSidebar }} />
      </div>
      <div style={{ marginLeft: sidebar ? "230px" : "10px", paddingTop: "80px" }}>
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
          {/* Iterate over each category and display books */}
          {Object.entries(groupedBooks).map(([category, booksInCategory]) => (
            <div key={category}>
            <h2 style={{ textAlign: "left", margin: "20px" }}>{category}</h2>
              <div className='books-cards-buy-wrapper'>
                {/* Iterate over books in the current category */}
                {booksInCategory.map((book, i) => (
                  <BookCards
                      key={book._id}
                      book={book}
                      img={img[book._id] ? img[book._id] : ''}
                      // onClick={() => toggleModal(book)} // Pass the book to toggleModal
                    />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
