import React from 'react';

function Message({ message }) {
  return (
    <div className={`mb-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
      <span className={`inline-block p-2 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
        {message.content}
      </span>
    </div>
  );
}

export default Message;