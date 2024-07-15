// ChatInterface.js
import React, { useEffect, useRef } from 'react';

function ChatInterface({ conversation }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [conversation]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Conversation</h2>
      <div className="space-y-4">
        {conversation.map((message, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${
              message.type === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}
          >
            <p className="font-medium text-sm mb-1">
              {message.type === 'user' ? 'You' : 'Bot'}:
            </p>
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatInterface;