import React, { useState, useLayoutEffect, useEffect} from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useParams } from 'react-router-dom'

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js';
import Messages from '../Messages/Messages.js';
import TextContainer from "../TextContainer/TextContainer";
import {useLocation} from "react-router-dom"

let socket;

const Chat = ({ location, roomId }) => {
  const [name, setName] = useState(JSON.parse(localStorage.getItem("profile")).name);
  const [room, setRoom] = useState(useParams().id);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";
  
  const getRoom = useParams().id;
  console.log(getRoom)
  useEffect(() => {
    //Getting the User Name and Room Name from URL
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
  }, [ENDPOINT, roomId]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages(messages => [ ...messages, message ]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  

  return (
    <div className="outerContainer">
      <div className="container">
         {/* <InfoBar room={room} /> */}
         <Messages messages={messages} name={name} />
         <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />        
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;