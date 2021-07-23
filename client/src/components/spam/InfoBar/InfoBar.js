import React from 'react';

import './InfoBar.css';


const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" alt="Online" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img  alt="Close" /></a>
        </div>
    </div>
);

export default InfoBar;