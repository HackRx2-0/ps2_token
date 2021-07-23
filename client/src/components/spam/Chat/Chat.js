import React, { useState, useLayoutEffect, useEffect} from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useParams } from 'react-router-dom'
import {useHistory} from 'react-router'
import {useMutation} from 'react-query'
import './Chat.css';

import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js';
import Messages from '../Messages/Messages.js';
import TextContainer from "../TextContainer/TextContainer";
import {useLocation} from "react-router-dom"
import { sendDataApi } from '../../../api/Auth'

let socket;

const RoomBar = ({room}) => {
  return (
    <div className="root-room-bar">
      <span className="heading">{room}</span>
    </div>
  )
}

const Chat = () => {
  const [name, setName] = useState(JSON.parse(localStorage.getItem("profile")).name);
  const [room, setRoom] = useState(useParams().id);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file,setFile] = useState(null);
  const history = useHistory();
  const ENDPOINT = "localhost:5000";
  
  const sendData = useMutation(data => sendDataApi(data))

  let getRoom = useParams().id;
  console.log(getRoom)

  useEffect(() => {   
  setMessages([]);
  setMessage(''); 
  socket = io(ENDPOINT, {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],

  });
  setName(JSON.parse(localStorage.getItem("profile")).name)
  socket.emit("join", { name, room }, (error) => {
    if (error) {
      alert(`${error}`);
    }
  });
  
  },[])

  useEffect(() => {
    //Getting the User Name and Room Name from URL 
  setMessages([]);
  setMessage('');
    socket = io(ENDPOINT, {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],

    });
    setName(JSON.parse(localStorage.getItem("profile")).name)

    setRoom(getRoom);
    console.log(getRoom, "OK")

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(`${error}`);
      }
    });
  }, [ENDPOINT, getRoom,useParams().id]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages(messages => [ ...messages, message ]);
      console.log(message)
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (file) {
      const msgObj = {
        // id : yourID,
        type : "file",
        body : file,
        mimetype : file.type,
        fileName : file.name,
      }
      socket.emit("sendMessage", msgObj, () => setFile());
      setMessage("");
    }
    else if (message) {
      sendData.mutate(message);
      socket.emit("sendMessage", message, () => setMessage(""));
    }
    
    // socket.on("message", (message) => {
    //   setMessages(messages => [ ...messages, message ]);
    //   console.log(message)
    // });
  };
  
  return (
    <div className="outerContainer">
      <div className="container">
        <RoomBar room={room}/>
         {/* <InfoBar room={room} /> */}
         <Messages messages={messages} name={name} />
         <Input message={message} setMessage={setMessage} sendMessage={sendMessage} setFile={setFile} prods={sendData.data ? sendData.data.data : null}/>        
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;