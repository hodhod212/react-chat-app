import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import FetchRandomUser from  './FetchRandomUser';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();
    /* if (message === "/randompicture") {
      url ='https://randomuser.me/api/?results=1'
      const response = await fetch(url);
      const data = await response.json();
      const  large  = data.results[0].picture.large;
      message =  '<img src="'+large+'">';     
    } */

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
