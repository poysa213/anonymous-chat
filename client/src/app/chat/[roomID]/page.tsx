'use client'
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ChatApp.css';
import { host } from '../../../../config';

type Message = {
  type: string;
  content: string;
};

const ChatRoom = ({ params }: any) => {
  const [userUUID, setUserUUID] = useState('');
  const roomID = params.roomID
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let storedUUID = localStorage.getItem('userUUID');
    if (!storedUUID) {
      storedUUID = uuidv4();
      localStorage.setItem('userUUID', storedUUID);
    }
    setUserUUID(storedUUID);
  }, []);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);



  useEffect(() => {
    const chatSocket = new WebSocket(
      `ws://${host}/ws/chat/${roomID}/`
    );

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data.messageType === "text") {
        const messageWithUUID = {
          type: "text",
          content: `${data.message}`
        };
        setChatLog(prevLog => [...prevLog, messageWithUUID]);
      } else if (data.messageType === "image") {
        const messageWithImage = {
          type: "image",
          content: `<img src="data:image/png;base64, ${data.message}" alt="Received Image" style="width: 450px; height: 405px;" />`
        };
        
        setChatLog(prevLog => [...prevLog, messageWithImage]);
      }
    };

    chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };

    return () => {
      chatSocket.close();
    };
  }, [roomID]);

  const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    setMessageInput(e.currentTarget.value);
  };

  const handleSendMessage = () => {
    const chatSocket = new WebSocket(
      `ws://${host}/ws/chat/${roomID}/`
    );

    chatSocket.onopen = function () {
      chatSocket.send(JSON.stringify({
        message: messageInput,
        userUUID: userUUID,
        messageType: "text"
      }));
      setMessageInput('');
    };
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };



  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1]; // Type assertion to treat reader.result as string // Extract the base64 data (remove data:image/png;base64,)
        
        const chatSocket = new WebSocket(`ws://${host}/ws/chat/${roomID}/`);
  
        chatSocket.onopen = () => {
          chatSocket.send(JSON.stringify({
            message: base64Data,
            userUUID: userUUID,
            messageType: "image"
          }));
          setSelectedImage(null);
        };
      };
  
      reader.readAsDataURL(selectedImage);
    }
  };
  








  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const submitButton = document.querySelector('#chat-message-submit') as HTMLInputElement;
      if (submitButton) {
        submitButton.click();
      }
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-log">
      {chatLog.map((message, index) => (
  <div key={index} className="message bg-blue-200 w-2/3 p-3 m-3">
      <span className="user-uuid text-sm text-slate-600">{userUUID}</span>
    {message.type === 'image' ? (
      <div dangerouslySetInnerHTML={{ __html: message.content }} />
    ) : (
      <>
        <br />
        <span className="message-text">{message.content}</span>
      </>
    )}
  </div>
))}

</div>
      <div className='input-container'>
        <input type="file" onChange={handleImageChange} className="image-upload" />
        <button id="chat-message-submit" className="send-button" onClick={handleUpload}>Upload</button>
      </div>
      <div className="input-container">
        <input
          id="chat-message-input"
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
          onKeyUp={handleInputKeyUp}
        />
  
        <button
          id="chat-message-submit"
          onClick={handleSendMessage}
          className="send-button"
        >
          Send
        </button>



      </div>
    </div>
  );
};
export default ChatRoom;


