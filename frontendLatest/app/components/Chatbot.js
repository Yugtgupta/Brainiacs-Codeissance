import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Update chat history with user input
        setChatHistory([...chatHistory, { sender: 'user', text: input }]);
        setLoading(true);
        setInput('');

        try {
            const response = await axios.post('/chatbot-ml', { input });
            const { output } = response.data;

            // Update chat history with the bot's response
            setChatHistory((prev) => [...prev, { sender: 'bot', text: output }]);
        } catch (error) {
            console.error('Error fetching response:', error);
            setChatHistory((prev) => [...prev, { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100">
            <header className="bg-slate-200 text-slate-700 p-4">
                <h1 className="text-3xl font-bold">VidyaSaathi Chatbot</h1>
            </header>

            <div className="flex-grow overflow-y-auto p-4">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="h-64 overflow-y-auto mb-4 border border-gray-300 rounded-md p-4">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <span className={`inline-block px-3 py-1 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        {loading && (
                            <div className="text-left">
                                <span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-lg">Thinking...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex p-4 bg-white border-t border-gray-300">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me anything..."
                    className="border border-gray-300 rounded-md p-2 flex-grow mr-2"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
