import React from 'react'

import './Message.css';

const Image = ({blob,classes}) => {

  const [src,setSrc] = React.useState("");
  
  React.useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      setSrc(reader.result)
    }
  },[blob])
  return(
    <img src={src} className={classes} style={{ width : 150, height : "auto", borderRadius : "20px", margin : "5px"}} alt="img" />
  )
}

const Message = ({ message, name }) => {
  const { text, user} = message;
    let isSentByCurrentUser = false;

    const trimmedName = name;

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }
    
    let blob ;
    if (message.type == "file"){
      blob = new Blob([message.body], {type : message.type})
    }

  return(
      isSentByCurrentUser
      ? (
          <div className="messageContainer justifyEnd">
              <p className="sentText pr-10">{trimmedName}</p>
              <div className="messageBox backgroundBlue">
                { message.type == "file" && <Image blob={blob} classes="msg-img" />}
                {text && <p className="messageText colorWhite">{text}</p>}
              </div>
          </div>
      )
      : (
        <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
            { message.type == "file" && <Image blob={blob} classes="dark-msg-img" />}
            {text && <p className="messageText colorDark">{text}</p>}
        </div>
        <p className="sentText pl-10">{user}</p>
    </div>
      )
   )

 };

export default Message;