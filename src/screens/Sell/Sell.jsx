import React, { useState } from 'react';
import './sell.css';
import Navbar from './../../components/Navbar/Navbar';
import sellImage from '../../assets/sell-form.svg'
import api from '../../api/api';


const Sell = () => {
  const [image, setImage] = useState();
  const [img, setImg] = useState();
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [seller, setSeller] = useState('');
  const [sphone, setsPhone] = useState('');
  const [semail, setsEmail] = useState('');
  const [sstate, setsState] = useState(''); // Default to an empty string
  const [sdistrict, setsDistrict] = useState(''); // Default to an empty string
  const [actualPrice, setActualPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const statesInIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  ];

  const districtsInIndia = {
    "Andhra Pradesh": [
      "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool",
      "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram",
      "West Godavari", "Y.S.R. Kadapa"]
    ,
    // Add districts for other states
    "Arunachal Pradesh": [
      
    ],
    "Uttar Pradesh": [
      "Agra","Aligarh","Allahabad","Ambedkar Nagar","Amethi","Amroha","Auraiya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Faizabad","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kushinagar","Lakhimpur Kheri","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Rae Bareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shrawasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"
    ],
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setsState(selectedState);
    setsDistrict('');
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value); 
    if (e.target.value === 'sell') {
      setActualPrice('');
      setSellingPrice('');
    }
    else{
      setActualPrice(0);
      setSellingPrice(0);
    }
  };

  const handleAddBook = (e) => {
    e.preventDefault()
    api.post('book/add-book',{
      book_name: bookName,
      author : author,
      seller_name : seller,
      seller_phone : sphone,
      seller_email : semail,
      seller_state : sstate,
      seller_district : sdistrict,
      actual_price : actualPrice ,
      selling_price :sellingPrice ,
      status : "sell",
      img: img ,
    },{
      headers: { 'Content-Type':"multipart/form-data"}
    }).then(response => {
      console.log(response)
    })
  }

  const [sidebar, setSidebar] = useState(false)

  return (
    <div>
        <div>
          <Navbar visibility={{sidebar, setSidebar}}/>
        </div>
      <div className="parts">
        <div className="image-sell">
        <img className="image-s" src={sellImage}/>
        </div>
        <div className="card">
          <div className="sell-form">
            <form action="post">
              <h1>Upload Book Details</h1>
              <table>
                <tbody>
                  <tr>
                    <td><label>Upload Book Image:</label></td>
                    <td>
                      <input type="file" onChange={(e) => { setImage(URL.createObjectURL(e.target.files[0])); setImg(e.target.files[0]) }} required />
                      <img className="book-img" src={image} />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Book Name</label></td>
                    <td><input type="text" onChange={(e) => { setBookName(e.target.value) }} required /></td>
                  </tr>
                  <tr>
                    <td><label>Book Author Name</label></td>
                    <td><input type="text" onChange={(e) => { setAuthor(e.target.value) }} required /></td>
                  </tr>
                  <tr>
                    <td><label>Seller Name</label></td>
                    <td><input type="text" onChange={(e) => { setSeller(e.target.value) }} required /></td>
                  </tr>
                  <tr>
                    <td><label>Seller Mobile</label></td>
                    <td><input type="tel" onChange={(e) => { setsPhone(e.target.value) }} required /></td>
                  </tr>
                  <tr>
                    <td><label>Seller Email</label></td>
                    <td><input type="email" onChange={(e) => { setsEmail(e.target.value) }} required /></td>
                  </tr>
                  <tr>
                    <td><label>Seller State</label></td>
                    <td>
                      <select
                        value={sstate}
                        onChange={handleStateChange}
                        required
                      >
                        <option value="" disabled>Select State</option>
                        {statesInIndia.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label>Seller District</label></td>
                    <td>
                      <select
                        value={sdistrict}
                        onChange={(e) => setsDistrict(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select District</option>
                        {districtsInIndia[sstate] &&
                          districtsInIndia[sstate].map((district, index) => (
                            <option key={index} value={district}>
                              {district}
                            </option>
                          ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                  <td><label>Sell or Donate</label></td>
                    <td>
                      <select
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="sell">Sell</option>
                        <option value="donate">Donate</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label>Book Actual Price</label></td>
                    <td>
                      <input
                        type="number"
                        onChange={(e) => setActualPrice(e.target.value)}
                        required={selectedStatus === 'sell'} // Enable input if 'sell' is selected
                        value={selectedStatus === 'donate' ? '0' : actualPrice}
                        readOnly={selectedStatus === 'donate'} // Make the field read-only if 'donate' is selected
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Book Selling Price</label></td>
                    <td>
                      <input
                        type="number"
                        onChange={(e) => setSellingPrice(e.target.value)}
                        required={selectedStatus === 'sell'} // Enable input if 'sell' is selected
                        value={selectedStatus === 'donate' ? '0' : sellingPrice}
                        readOnly={selectedStatus === 'donate'} // Make the field read-only if 'donate' is selected
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" >
                      <center><button className="sell-submit" onClick={handleAddBook}>Submit</button></center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
