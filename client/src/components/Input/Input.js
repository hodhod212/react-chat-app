import React from 'react';
import FetchRandomUser from  '../Chat/FetchRandomUser';
import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      id = "/"
      list = "suggestions"
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
<datalist id="suggestions">
    <option value="/"/>
    <option value="/love"/>
    <option value="/hate"/>
    <option value="/friend"/>
    <option value="/hej"/>
</datalist>
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;