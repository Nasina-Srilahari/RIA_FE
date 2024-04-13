import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Card, CardBody, CardTitle, CardImg, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { FaHeart ,FaBook, FaEdit, FaTrash} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Create a functional component for the profile page
const Profile = () => {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Parse the JSON string
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [addedBooks, setAddedBooks] = useState([]);
  const [addedImgs, setAddedImgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchFavoriteBooks(user.favorites);
      fetchAddedBooks(user.username);
    }
  }, [user, navigate]);

  const fetchFavoriteBooks = async (favoriteIds) => {
    try {
      const response = await api.post("book/favorites", {
        bookIds: favoriteIds,
      });
      console.log(response.data); // Log the response to see if it contains the expected data
      setFavoriteBooks(response.data.matchingBooks);
      setImgs(response.data.imgs);
      // console.log('images...',imgs);
    } catch (error) {
      console.error("Error fetching favorite books:", error);
    }
  };

  const fetchAddedBooks = async (username) => {
    try {
      const response = await api.post("book/addedbooks", { seller: username });
      console.log(username);
      console.log(response.data); // Log the response to see if it contains the expected data
      setAddedBooks(response.data.addedBooks);
      console.log(addedBooks);
      setAddedImgs(response.data.addedImgs);
    } catch (error) {
      console.error("Error fetching added books:", error);
    }
  };

  const formatDate = (timestamp) => {

    const date = new Date(timestamp);
    const added_date = new Date(date.getTime() + 1000 * 60 * 30 * 7);

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

  return (
    <div>
      <div>
        <Navbar visibility={{ sidebar, setSidebar }} />
      </div>
      <div
        style={{ marginLeft: sidebar ? "230px" : "10px", paddingTop: "80px" }}
      >
        <div className="profile-container mt-4">
          {/* <h1 className="text-center">Profile</h1> */}
          <div className="profile-row">
            <div className="col-md-6 profile-card">
              <center>
                <ProfileCard
                  name={user ? user.name : ""}
                  username={user ? user.username : ""}
                  email={user ? user.email : ""}
                  imageUrl="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                />
              </center>
            </div>
            <br></br>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div className="col-md-6 fav-card">
                <center>
                  <FavouritesCard favoriteBooks={favoriteBooks} imgs={imgs} />
                </center>
              </div>

              <div className="col-md-6 addedbooks-card">
                <center>
                  <AddedBooksCard
                    addedBooks={addedBooks}
                    addedImgs={addedImgs}
                  />
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create a functional component for the profile card
const ProfileCard = ({ name, email, username, imageUrl }) => {
  return (
    <Card style={{ backgroundColor: "#ffe6ff" }}>
      <h2
        className="text-center"
        style={{ marginBottom: "2px", borderBottom: "2px solid #dee2e6" }}
      >
        Profile
      </h2>
      <CardImg
        top
        width="100%"
        src={imageUrl}
        alt="Profile Image"
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          marginTop: "2px",
        }}
      />
      <br></br>
      <CardBody>
        <CardTitle tag="h3" style={{ color: "#ac00e6" }}>
          {name}
        </CardTitle>
        <br></br>
        <table className="profile-table">
          <tbody>
            <tr>
              <td className="profile-lable" style={{ textAlign: "center" }}>
                FullName
              </td>
              <td>:</td>
              <td className="profile-detail" style={{ textAlign: "center" }}>
                {name}
              </td>
            </tr>

            <tr>
              <td className="profile-lable" style={{ textAlign: "center" }}>
                Username
              </td>
              <td>:</td>
              <td className="profile-detail" style={{ textAlign: "center" }}>
                {username}
              </td>
            </tr>

            <tr>
              <td className="profile-lable" style={{ textAlign: "center" }}>
                Email
              </td>
              <td>:</td>
              <td className="profile-detail" style={{ textAlign: "center" }}>
                {email}
              </td>
            </tr>
            <br></br>
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

const FavouritesCard = ({ favoriteBooks, imgs }) => {
  const [modal, setModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [i, setI] = useState(0);

  const toggleModal = (book, index) => {
    setI(index);
    setSelectedBook(book);
    // console.log(selectedBook.img);
    setModal(!modal);
  };

  const formatDate = (timestamp) => {

    const date = new Date(timestamp);
    const added_date = new Date(date.getTime() + 1000 * 60 * 30 * 7);

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

  return (
    <Card
      style={{
        maxWidth: "700px",
        marginRight: "50px",
        backgroundColor: "#ffe6ff",
        color: "#7c777e",
        textAlign: "center",
      }}
    >
      <CardBody>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderBottom: "2px solid #dee2e6",
          }}
        >
          <CardTitle
            tag="h4"
            style={{
              color: "#ac00e6",
              fontSize: "22px",
              marginBottom: "2px",
              marginTop: "0px",
            }}
          >
            Favourites&nbsp;
            <FaHeart
              style={{
                color: "red",
                fontSize: "16px",
                marginBottom: "0px",
                marginTop: "2px",
              }}
            />
          </CardTitle>
        </div>
        <ul>
          {favoriteBooks && favoriteBooks.length > 0 ? (
            favoriteBooks.map((book, index) => (
              <li key={book._id}>
                <a
                  href="#"
                  style={{ textDecoration: "none" }}
                  onClick={() => toggleModal(book, imgs[index])}
                >
                  <span style={{ fontWeight: "500", color: "#600080" }}>
                    {book.book_name}
                  </span>
                  &nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#7c777e" }}>{book.status}</span>
                </a>
              </li>
            ))
          ) : (
            <p>No favorite books found.</p>
          )}
        </ul>

        <Modal
          className="modal-dialog modal-dialog-centered"
          isOpen={modal}
          toggle={toggleModal}
        >
          <ModalHeader
            className="custom-modal-header modal-header modal-header"
            toggle={toggleModal}
            style={{ fontSize: "20px", borderBottom: "2px solid #dee2e6" }}
          >
            Book Details
          </ModalHeader>
          <ModalBody>
            <table className="profile-table">
              <tbody>
                <tr
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  {/* {console.log(selectedBook, imgs)} */}
                  <td className="profile-lable"></td>
                  <td
                    style={{
                      borderRadius: "9px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      // src={`data:${selectedBook.img.contentType};base64,${selectedBook.img.data.data.toString('base64')}`}/
                      src={selectedBook && imgs && `data:image/png;base64,${i}`}
                      alt="Book Cover"
                      style={{
                        width: "110px",
                        height: "110px",
                        borderRadius: "9px",
                        justifyContent: "center",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="profile-lable">Book Name</td>
                  <td>:</td>
                  <td className="profile-detail">
                    {selectedBook && selectedBook.book_name}
                  </td>
                </tr>

                <tr>
                  <td className="profile-lable">Author</td>
                  <td>:</td>
                  <td className="profile-detail">
                    {selectedBook && selectedBook.author}
                  </td>
                </tr>

                <tr>
                  <td className="profile-lable">Seller Name</td>
                  <td>:</td>
                  <td className="profile-detail">
                    {selectedBook && selectedBook.seller_name}
                  </td>
                </tr>

                <tr>
                  <td className="profile-lable">Actual Price</td>
                  <td>:</td>
                  <td className="profile-detail">
                    {selectedBook && selectedBook.actual_price}
                  </td>
                </tr>

                <tr>
                  <td className="profile-lable">Selling Price</td>
                  <td>:</td>
                  <td className="profile-detail">
                    {selectedBook && selectedBook.selling_price}
                  </td>
                </tr>

                <tr>
                  <td className="profile-lable">Status</td>
                  <td>:</td>
                  <td className="profile-detail">
                    {selectedBook && selectedBook.status}
                  </td>
                </tr>

                <tr>
                  <td className="profile-lable">Date Posted</td>
                  <td>:</td>
                  <td className="profile-detail">
                    {selectedBook && formatDate(selectedBook.postedOn)}
                  </td>
                </tr>

                {/* Add more details as needed */}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button color="primary" >
              <Link to='/chat' state={{ receiver: selectedBook && selectedBook.seller_name }} style={{textDecoration: 'none', color: 'white'}}>
                chat
              </Link>
            </Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};

const AddedBooksCard = ({ addedBooks, addedImgs }) => {
  const [modal, setModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const toggleModal = (book, index) => {
    setSelectedIndex(index);
    setSelectedBook(book);
    setEditMode(false);
    setModal(!modal);
  };

  const handleEdit = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleInputChange = (field, value) => {
    // Clone the selectedBook to avoid modifying the state directly
    const updatedBook = { ...selectedBook, [field]: value };

    // Update the state with the modified book
    setSelectedBook(updatedBook);
  };

  const handleUpdate = async (bookId) => {
    // Implement the logic for updating the book details
    console.log("Update button clicked for book:", selectedBook);
    setEditMode(false); // Disable edit mode after updating
    try {
      const response = await api.post("/book/updatebook", { bookId: bookId, bookName:selectedBook.book_name, bookName:selectedBook.book_name, bookAuthor:selectedBook.author, bookActualPrice:selectedBook.actual_price, bookSellingPrice:selectedBook.selling_price, bookStatus:selectedBook.status });
      console.error("Book updated Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error in updated book:", error);
    }
  };

  // Function to handle the delete button click
  const handleDelete = async (bookId) => {
    console.log("Delete button clicked for book:", selectedBook);
    try {
      const response = await api.post("/book/deletebook", { bookId: bookId });
      console.error("Book deleted Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error in deleting book:", error);
    }
  };

  const formatDate = (timestamp) => {

    const date = new Date(timestamp);
    const added_date = new Date(date.getTime() + 1000 * 60 * 30 * 7);

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

  return (
    <Card
      style={{
        maxWidth: "700px",
        marginRight: "50px",
        backgroundColor: "#ffe6ff",
        color: "#7c777e",
        textAlign: "center",
      }}
    >
      <CardBody>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderBottom: "2px solid #dee2e6",
          }}
        >
          <CardTitle
            tag="h4"
            style={{
              color: "#ac00e6",
              fontSize: "22px",
              marginBottom: "2px",
              marginTop: "0px",
            }}
          >
            Books Added&nbsp;
            <FaBook
              style={{
                color: "blue",
                fontSize: "16px",
                marginBottom: "0px",
                marginTop: "2px",
              }}
            />
          </CardTitle>
        </div>
        <ul>
          {addedBooks && addedBooks.length > 0 ? (
            addedBooks.map((book, index) => (
              <li key={book._id}>
                <a
                  href="#"
                  style={{ textDecoration: "none" }}
                  onClick={() => toggleModal(book, index)}
                >
                  <span style={{ fontWeight: "500", color: "#600080" }}>
                    {book.book_name}
                  </span>
                  &nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#7c777e" }}>{book.status}</span>
                </a>
              </li>
            ))
          ) : (
            <p>No added books found.</p>
          )}
        </ul>

        <Modal
          className="modal-dialog modal-dialog-centered"
          isOpen={modal}
          toggle={toggleModal}
        >
          <ModalHeader
            className="custom-modal-header modal-header modal-header"
            toggle={toggleModal}
            style={{ fontSize: "20px", borderBottom: "2px solid #dee2e6" }}
          >
            Book Details
          </ModalHeader>
          <ModalBody>
            <table className="profile-table">
              <tbody>
                <tr
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <td className="profile-lable"></td>
                  <td
                    style={{
                      borderRadius: "9px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    {addedImgs && addedImgs[selectedIndex] && (
                      <img
                        src={`data:image/png;base64,${addedImgs[selectedIndex]}`}
                        alt="Book Cover"
                        style={{
                          width: "110px",
                          height: "110px",
                          borderRadius: "9px",
                          justifyContent: "center",
                        }}
                      />
                    )}
                  </td>
                </tr>

                {editMode ? (
                  <>
                    <tr>
                      <td className="profile-lable">Book Name</td>
                      <td>:</td>
                      <td className="profile-details">
                        <input
                          type="text"
                          value={selectedBook && selectedBook.book_name}
                          onChange={(e) =>
                            handleInputChange("book_name", e.target.value)
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Author</td>
                      <td>:</td>
                      <td className="profile-details">
                        <input
                          type="text"
                          value={selectedBook && selectedBook.author}
                          onChange={(e) =>
                            handleInputChange("author", e.target.value)
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Actual Price</td>
                      <td>:</td>
                      <td className="profile-details">
                        <input
                          type="text"
                          value={selectedBook && selectedBook.actual_price}
                          onChange={(e) =>
                            handleInputChange("actual_price", e.target.value)
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Selling Price</td>
                      <td>:</td>
                      <td className="profile-details">
                        <input
                          type="text"
                          value={selectedBook && selectedBook.selling_price}
                          onChange={(e) =>
                            handleInputChange("selling_price", e.target.value)
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Status</td>
                      <td>:</td>
                      <td className="profile-details">
                        <input
                          type="text"
                          value={selectedBook && selectedBook.status}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Date Posted</td>
                      <td>:</td>
                      <td className="profile-detail">
                        {selectedBook && selectedBook.postedOn}
                      </td>
                    </tr>
                    {/* Add similar input fields for other details */}
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="profile-lable">Book Name</td>
                      <td>:</td>
                      <td className="profile-details">
                        {selectedBook && selectedBook.book_name}
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Author</td>
                      <td>:</td>
                      <td className="profile-detail">
                        {selectedBook && selectedBook.author}
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Actual Price</td>
                      <td>:</td>
                      <td className="profile-detail">
                        {selectedBook && selectedBook.actual_price}
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Selling Price</td>
                      <td>:</td>
                      <td className="profile-detail">
                        {selectedBook && selectedBook.selling_price}
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Status</td>
                      <td>:</td>
                      <td className="profile-detail">
                        {selectedBook && selectedBook.status}
                      </td>
                    </tr>

                    <tr>
                      <td className="profile-lable">Date Posted</td>
                      <td>:</td>
                      <td className="profile-detail">
                        {selectedBook && formatDate(selectedBook.postedOn)}
                      </td>
                    </tr>

                  </>
                )}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            {!editMode ? (
              <Button color="primary" onClick={handleEdit}>
                <FaEdit /> Edit
              </Button>
            ) : (
              <Button color="primary" onClick={() => handleUpdate(selectedBook._id)}>
                Update
              </Button>
            )}
            {/* Delete button */}
            <Button
              color="danger"
              className="btn-danger"
              onClick={() => handleDelete(selectedBook._id)}
            >
              <FaTrash /> Delete
            </Button>

            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
            {/* <Button
              color="primary"
              onClick={() => {
                // Handle chat functionality here
                // You may want to redirect the user to a chat page or implement your chat logic
                toggleModal();
              }}
            >
              Chat
            </Button> */}
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default Profile;
