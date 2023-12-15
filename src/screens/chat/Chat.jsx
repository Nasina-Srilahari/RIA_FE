import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import './Chat.css'
import api from '../../api/api';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socket = io('http://localhost:5000', {
  transports: ['websocket'], 
});

const Chat = () => {
    const [sidebar, setSidebar] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate()
    const [chatUser, setChatUser] = useState("")
    const [chatMessage, setChatMessages] = useState([])
    const [typedMsg, setTypedMsg] = useState()
    const location = useLocation()

    library.add(faPaperPlane)


    const fetchAllUsers = () => {
        api.post('/user/fetchAllUsers').then(response => {
            setAllUsers(response.data.users)
            console.log(response.data.users)
            setChatUser(response.data.users[0])

            if(location.state !== undefined && location.state !== null){
                response.data.users.map((user) => {
                    if(user.username === location.state.receiver){
                        setChatUser(user)
                        fetchMessages(user)
                    }
                })
            }else{
                setChatUser(response.data.users[0])
                fetchMessages(response.data.users[0])
            }

            
        });
    };

    useEffect(() => {

        console.log("params",location.state)
        if (user === null || undefined) {
            navigate("/");
        }
        socket.emit('set-username', user.username);
        fetchAllUsers();
        socket.on('new-message', (message) => {
            console.log(message)
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('new-message'); 
        };
    }, []);

    const handleSendMessage = () => {
        socket.emit('send-message', {sender: user,receiver: chatUser,content: typedMsg});
        // api.post('/message/sendMessage',
        // {
        //     sender : user._id,
        //     receiver: chatUser._id,
        //     content: typedMsg,
        // }).then(response => {
        //     if(response.ok){
        //         console.log("sent message.........")
        //     }
        // });
    }

    const fetchMessages = (eachUser) => {
        api.post('/message/recieveMessage',
        {
            sender : user._id,
            receiver: eachUser._id,
        }).then(response => {
            setChatMessages(response.data.messages)
        });
    }

    const changeUser = (eachUser) => {
        setChatUser(eachUser);
        fetchMessages(eachUser);
    }

    const formatDate = (timestamp) => {

        const date = new Date(timestamp);

        const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
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
            <div style={{ marginLeft: sidebar ? "230px" : "0px", paddingTop: "65px" }}>
                <div className="front-container1">
                    <div className="row chat-top">
                        <div className="self-name">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="" className="profile-image rounded-circle"/>
                            <span className="ml-2">{user.name}</span>
                        </div>
                        <div className="other-name" >
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="" className="profile-image rounded-circle"/>
                            <span className="ml-2">{chatUser.name}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="contacts">
                            <div className="contact-table-scroll">
                                <table className="table table-hover">
                                    <tbody>
                                        {
                                            allUsers.map((eachUser) => { 
                                                return (
                                                    user.username !== eachUser.username &&
                                                   ( <tr style={{ backgroundColor: '#f4e0fc' }} onClick={() => {changeUser(eachUser)}} className={`${eachUser.username === chatUser.username ? 'active-chat' : ''}`} >
                                                        <td><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="" className="profile-image rounded-circle" />
                                                        <a style={{ color: "black" }} id="{{user.username}}_status" >{eachUser.name}</a></td>
                                                    </tr>)
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="message-area">
                            <div className="message-table-scroll">
                                <table className="table">
                                    <tbody id='chat-body'>
                                        {
                                            chatMessage.map((msg) => {
                                                return(

                                                    <tr key={msg._id}>
                                                        <td>
                                                            <p className={`message ${msg.sender === user._id ? 'sent' : 'received'}`}>
                                                                {msg.content} 
                                                                <br/><span className='chat-time'>{formatDate(msg.timestamp)}</span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="message-box p-3">
                                <div className="message-input">
                                    <input type="text" className="form-control" id="message_input" placeholder="Write message..." onChange={(e) => setTypedMsg(e.target.value)} />
                                </div>
                                <div className=" mt-1">
                                    <div className="control">
                                        <button className="chat-submit" id="chat-message-submit" onClick={handleSendMessage} ><FontAwesomeIcon icon={faPaperPlane}/></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Chat