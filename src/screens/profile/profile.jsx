// Import necessary React and Reactstrap components
import React from 'react';
import './profile.css'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

// Create a functional component for the profile page
const ProfilePage = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Profile</h1>
      <div className="row">
        <div className="col-md-6 profile=card">
          <center>
          <ProfileCard 
            name="Tejaswini"
            phone="1234567890"
            email="t@example.com"
            username="teju"
            imageUrl="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          />
          </center>
        </div><br></br>
        <div className="col-md-6 fav-card">
          <center>
          <FavouritesCard />
          </center>
        </div>
      </div>
    </div>
  );
};

// Create a functional component for the profile card
const ProfileCard = ({ name, email, username, imageUrl }) => {
  return (
    <Card style={{backgroundColor:'#ffe6ff'}}>
      <CardImg
        top
        width="100%"
        src={imageUrl}
        alt="Profile Image"
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
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

// Create a functional component for the favourites card
const FavouritesCard = () => {
  return (
    <Card style={{maxWidth: "700px", marginRight: "50px", backgroundColor: '#ffe6ff'}}>
      <CardBody>
        <CardTitle tag="h4" style={{color:'#ac00e6'}}>FAVOURITES</CardTitle>
        <ul>
          <li>Favourite 1</li>
          <li>Favourite 2</li>
          <li>Favourite 1</li>
          <li>Favourite 2</li>
          {/* Add more favourite items as needed */}
        </ul>
      </CardBody>
    </Card>
  );
};

export default ProfilePage;
