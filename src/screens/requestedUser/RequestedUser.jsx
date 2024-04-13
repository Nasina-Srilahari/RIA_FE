import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Navbar from "../../components/Navbar/Navbar";
import './RequestedUser.css'
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const RequestedUser = () => {

    const [requestedUsers, setRequestedUsers] = useState([])
    const [sidebar, setSidebar] = useState(false)
    const [imgs, setimgs] = useState([])
    const [alertMessage, setAlertMessage] = useState(null); 
    const [alertType, setAlertType] = useState(null);


    const fetchNonVerifiedUsers = () => {
        api.post(`user/notVerifiedUsers`).then(response => {
            console.log(response.data.result)
            setRequestedUsers(response.data.result)
            setimgs(response.data.imgs)
        }).then(error => {
            console.log(error)
        })
    }

    const ApproveUser = (email) => {
        api.post(`user/verify`,{email}).then(response => {
            console.log(response.data.result)
            fetchNonVerifiedUsers()
            setAlertMessage('User Verified Successfully');
            setAlertType('success');
        }).then(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchNonVerifiedUsers()
    }, [])


    return (
        <div>
            <div>
                <Navbar visibility={{ sidebar, setSidebar }} />
            </div>
            <div style={{ marginLeft: sidebar ? "230px" : "10px", paddingTop: "80px" }}>
                <div className="user-container">
                    {requestedUsers.map((user,i) => (
                        <div className="user-card">
                            <h3>Name: {user.username}</h3>
                            <p>email: {user.email}</p>
                            <p>User Type: {user.usertype}</p><br></br><br></br>
                            <img src={`data:image/png;base64,${imgs[i]}`} style={{height:'150px', width:'200px'}}/><br></br>
                            <button className="btn-approve" onClick={() => {ApproveUser(user.email)}}>Approve User</button>
                            {alertMessage && <AlertMessage message={alertMessage} type={alertType} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RequestedUser;

