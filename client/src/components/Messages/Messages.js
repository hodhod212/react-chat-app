import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import FetchRandomUser from '../Chat/FetchRandomUser';
import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
{/*     {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
 */}    
 {messages.map((message, i) =>
  <div>
    <div key={i}><Message message={message} name={name}/></div>
    <div key={i}><FetchRandomUser/></div>
  </div>
   )}

  </ScrollToBottom>
);

export default Messages;