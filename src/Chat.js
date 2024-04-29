import './App.css';

import React, { useState } from 'react';

export const AssistantMessage = ({ timeStamp, messageText }) => {
  return (
    <div className="msg left-msg">
      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">Assistant</div>
          <div className="msg-info-time">{timeStamp}</div>
        </div>
        <div className="msg-text">
          {messageText}
        </div>
      </div>
    </div>
  );
};

export const UserMessage = ({ messageText, timeStamp }) => {
  return (
    <div className="msg right-msg">
      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">You</div>
          <div className="msg-info-time">{timeStamp}</div>
        </div>
        <div className="msg-text">
          {messageText}
        </div>
      </div>
    </div>
  );
};

export const SendMessage = ({ addUserMessage, addAssistantMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add User Message
    addUserMessage(message)
    try {
      const response = await fetch('http://127.0.0.1:8000/assistant/ask/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text : message })
      });
      const data = await response.json();
      // Add Assistant Response
      if (data.response) {
        addAssistantMessage(data.response);
      }
      if (data.sources) {
        addAssistantMessage("Below are the sources I used to gather this information:");
        data.sources.forEach(source => addAssistantMessage(source));
      }
      if (data.error) {
        addAssistantMessage(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setMessage('');
  };

  return (
    <form className="window-input-area" onSubmit={handleSubmit}>
      <textarea
        className="window-input"
        placeholder="Send your message..."
        value={message}
        onInput={handleInputChange}
      />
      <button type="submit" className="window-send-btn">Send</button>
    </form>
  );
};