import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Card, CardBody, CardTitle, CardImg, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { FaHeart } from 'react-icons/fa';

// Create a functional component for the profile page
const Profile = () => {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Parse the JSON string
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [imgs, setImgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchFavoriteBooks(user.favorites);
    }
  }, [user, navigate]);

  const fetchFavoriteBooks = async (favoriteIds) => {
    try {
      const response = await api.post('book/favorites', { bookIds: favoriteIds });
      console.log(response.data); // Log the response to see if it contains the expected data
      setFavoriteBooks(response.data.matchingBooks);
      setImgs(response.data.imgs)
      // console.log('images...',imgs);
    } catch (error) {
      console.error("Error fetching favorite books:", error);
    }
  };

  return (
    imgs.length > 0 && (
      <div>
      <div>
        <Navbar visibility={{ sidebar, setSidebar }} />
      </div>
      <div style={{ marginLeft: sidebar ? "230px" : "10px", paddingTop: "80px" }}>
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
            </div><br></br>
            <div className="col-md-6 fav-card">
              <center>
                <FavouritesCard favoriteBooks={favoriteBooks} imgs={imgs} />
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  );
};



// Create a functional component for the profile card
const ProfileCard = ({ name, email, username, imageUrl }) => {
  return (
    <Card style={{backgroundColor:'#ffe6ff'}}>
    <h2 className="text-center" style={{marginBottom:'2px',borderBottom: '2px solid #dee2e6'}}>Profile</h2>
      <CardImg
        top
        width="100%"
        src={imageUrl}
        alt="Profile Image"
        style={{ width: '150px', height: '150px', objectFit: 'cover', marginTop:'2px' }}
      /><br></br>
      <CardBody>
        <CardTitle tag="h3" style={{color:'#ac00e6'}}>{name}</CardTitle>
        <br></br>
        <table className='profile-table'>
          <tbody>
          <tr>
              <td className='profile-lable' style={{ textAlign: 'center' }}>FullName</td>
              <td>:</td>
              <td className='profile-detail' style={{ textAlign: 'center' }}>{name}</td>
            </tr>

            <tr>
              <td className='profile-lable' style={{ textAlign: 'center' }}>Username</td>
              <td>:</td>
              <td className='profile-detail' style={{ textAlign: 'center' }}>{username}</td>
            </tr>

            <tr>
              <td className='profile-lable' style={{ textAlign: 'center' }}>Email</td>
              <td>:</td>
              <td className='profile-detail' style={{ textAlign: 'center' }}>{email}</td>
            </tr>
            <br></br>
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};


const FavouritesCard = ({ favoriteBooks,imgs }) => {
  const [modal, setModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [i, setI] = useState(0);

  const toggleModal = (book,index) => {
    setI(index)
    setSelectedBook(book);
    // console.log(selectedBook.img);
    setModal(!modal);
  };

  return (
    <Card style={{ maxWidth: "700px", marginRight: "50px", backgroundColor: '#ffe6ff', color: '#7c777e', textAlign: 'center' }}>
      <CardBody>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderBottom: '2px solid #dee2e6', }}>
          <CardTitle tag="h4" style={{ color: '#ac00e6', fontSize: '22px', marginBottom: '2px', marginTop: '0px' }}>Favourites&nbsp;<FaHeart style={{ color: 'red',fontSize:'16px',marginBottom: '0px', marginTop:'2px' }} /></CardTitle>
        </div>
        <ul>
          {favoriteBooks && favoriteBooks.length > 0 ? (
            favoriteBooks.map((book, index) => (
              <li key={book._id}>
                <a href="#" style={{ textDecoration: 'none' }} onClick={() => toggleModal(book,imgs[index])}>
                  <span style={{ fontWeight: '500', color: '#600080' }}>{book.book_name}</span>&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                  <span style={{ color: '#7c777e' }}>{book.status}</span>
                </a>
              </li>
            ))
          ) : (
            <p>No favorite books found.</p>
          )}
        </ul>

        <Modal className="modal-dialog modal-dialog-centered" isOpen={modal} toggle={toggleModal}>
          <ModalHeader className="custom-modal-header modal-header modal-header" toggle={toggleModal} style={{fontSize:'20px', borderBottom: '2px solid #dee2e6'}}>Book Details</ModalHeader>
          <ModalBody>
          <table className='profile-table'>
              <tbody>
                <tr style={{  display: 'flex', alignItems: 'center', justifyContent:'center', width:'100%' }}>
                  {/* {console.log(selectedBook, imgs)} */}
                  <td className='profile-lable'></td>
                    <td style={{ borderRadius: '9px', alignItems: 'center',display: 'flex', justifyContent:'center',width:'100%' }}>
                      <img
                        // src={`data:${selectedBook.img.contentType};base64,${selectedBook.img.data.data.toString('base64')}`}/
                        src={selectedBook && imgs && `data:image/png;base64,${i}`}
                        alt="Book Cover"
                        style={{ width: '110px', height: '110px', borderRadius: '9px', justifyContent:'center' }}
                      />
                  </td>
                </tr>

                <tr>
                  <td className='profile-lable'>Book Name</td>
                  <td>:</td>
                  <td className='profile-detail'>{selectedBook && selectedBook.book_name}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Author</td>
                  <td>:</td>
                  <td className='profile-detail'>{selectedBook && selectedBook.author}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Actual Price</td>
                  <td>:</td>
                  <td className='profile-detail'>{selectedBook && selectedBook.actual_price}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Selling Price</td>
                  <td>:</td>
                  <td className='profile-detail'>{selectedBook && selectedBook.selling_price}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Status</td>
                  <td>:</td>
                  <td className='profile-detail'>{selectedBook && selectedBook.status}</td>
                </tr>

                <tr>
                  <td className='profile-lable'>Date Posted</td>
                  <td>:</td>
                  <td className='profile-detail'>{selectedBook && selectedBook.postedOn}</td>
                </tr>

                {/* Add more details as needed */}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button color="primary" onClick={() => {
              // Handle chat functionality here
              // You may want to redirect the user to a chat page or implement your chat logic
              toggleModal();
            }}>
              Chat
            </Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};


export default Profile;
