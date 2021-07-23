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
function isValidURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
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
                {text ? isValidURL(text) ? <a className="messageText colorWhite" href={text} target="_blank" >{text}</a> : <p className="messageText colorWhite">{text}</p> : null }
              </div>
          </div>
      )
      : (
        <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
            { message.type == "file" && <Image blob={blob} classes="dark-msg-img" />}
            {text ? isValidURL(text) ? <a className="messageText colorDark" href={text} target="_blank" >{text}</a> : <p className="messageText colorDark">{text}</p> : null }
        </div>
        <p className="sentText pl-10">{user}</p>
    </div>
      )
   )

 };

export default Message;