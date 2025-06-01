import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import './../style/chatbot.css'; 
const ChatIcon = ({ isChatOpen, toggleChat }) => {
  return (
    <div 
      className={`chat-icon-container ${isChatOpen ? 'chat-open' : ''}`}
      onClick={toggleChat}
    >
      {isChatOpen ? (
        <X 
          size={40} 
          color="#dc3545" 
          className="chat-icon close-icon" 
        />
      ) : (
        <MessageCircle 
          size={60} 
          color="#007bff" 
          className="chat-icon message-icon" 
        />
      )}
    </div>
  );
};

export default ChatIcon;