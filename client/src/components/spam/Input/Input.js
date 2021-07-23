import React from "react";
import Divider from "@material-ui/core/Divider";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => (
    <form className="Input_Form">
        <Divider/>
        <input 
            className="input"  
            type="text" 
            placeholder="Type a message..." 
            value={message} 
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}>                
        </input>
       
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
        {/* <input  onChange={(event) => setMessage(event.target.value)} type="file"/>
        */}<Divider/> 
    </form>
);

export default Input;