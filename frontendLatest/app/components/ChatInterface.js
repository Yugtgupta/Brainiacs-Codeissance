import React, { useState, useEffect, useRef } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How are you?', sender: 'mentor', timestamp: '10:30 AM' },
    { id: 2, text: 'I am doing well, thank you! How about you?', sender: 'mentee', timestamp: '10:32 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messageEndRef = useRef(null);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'mentee',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-screen-md mx-auto bg-gray-100 h-screen flex flex-col">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Mentor Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="font-bold text-lg">John Doe (Mentor)</h2>
            <p className="text-sm">Online</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'mentee' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs shadow-md ${message.sender === 'mentee' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              <p>{message.text}</p>
              <span className="text-xs text-gray-400 block mt-1 text-right">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
