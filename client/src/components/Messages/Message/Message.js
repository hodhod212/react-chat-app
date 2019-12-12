import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';
import FetchRandomUser from '../../Chat/FetchRandomUser';
const Message = ({ message: { text, user, img}, name }) => {
  console.log(text)
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
   var pic;
  if (text === "/"){
    pic = <img src ="https://randomuser.me/api/portraits/women/64.jpg" />
    text = '';
  }
  else if (text === "/love"){
    pic = <img src ="https://media2.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif?cid=a7ff451cae08d4140f185a6d9af2d36a012ac79dd82555a8&rid=giphy.gif" />
    text = '';
  }
  else if (text === "/hate"){
    pic = <FetchRandomUser/>
    text = '';
  }else if(text ==='/random'){
    pic = <img src ={img} />
    text = '';
    
  }
  else if (text === "/friend"){
    pic = <img src ="https://randomuser.me/api/portraits/women/47.jpg" />
    text = '';
  }
  else{
    pic = null;
  } 
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
      <p className="messageText colorWhite">{ReactEmoji.emojify(text)}{pic}</p>

          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}{pic}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;

