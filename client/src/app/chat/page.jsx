'use client'
import React, { useEffect, useState } from 'react';
import { host } from '../../../config';

const ChatRoom = () => {
  const [chatLog, setChatLog] = useState('');
  const [messageInput, setMessageInput] = useState('');
    const roomName ="hello"
  useEffect(() => {
    const chatSocket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${roomName}/`
    );

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setChatLog(prevLog => prevLog + data.message + '\n');
    };

    chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };

    return () => {
      chatSocket.close();
    };
  }, [roomName]);

  const handleInputChange = e => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = () => {
      if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
        chatSocket.send(JSON.stringify({
          message: messageInput
        }));
        setMessageInput('');
      }
   
    else {
    const chatSocket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${roomName}/`
    );

    chatSocket.onopen = function () {
      chatSocket.send(JSON.stringify({
        message: messageInput
      }));
      setMessageInput('');
    };
  }
  };

  return (
    <div>
      <textarea id="chat-log" cols="100" rows="20" value={chatLog} readOnly></textarea>
      <br />
      <input
        id="chat-message-input"
        type="text"
        size="100"
        value={messageInput}
        onChange={handleInputChange}
      />
      <br />
      <input
        id="chat-message-submit"
        type="button"
        value="Send"
        onClick={handleSendMessage}
      />
    </div>
  );
};

export default ChatRoom;
