import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
      <h4>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h4>
      <h4>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h4>
    </div>
    {
      users
        ? (
          <div>
            <h2 style={{color:'darkgreen'}}>People currently chatting:</h2>
            <div className="activeContainer">
              <h3>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h3>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;