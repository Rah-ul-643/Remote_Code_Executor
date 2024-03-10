import React, { useState } from 'react';
import './ChatBox.css'; // Import your CSS file for styling
import axios from 'axios';


const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const REACT_APP_AI_URL = process.env.GEMINI_API_URL;

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    };
    const [thinking, setThinking] = useState(false);

    const handleBackgroundInteraction = () => {
        // Implement background interaction logic here
    };
    const [chatHistory, setChatHistory] = useState([]);

    const askAI = async() => {
        let n=chatHistory.length;
        const prompt={
            "contents": chatHistory.slice(0, n).map((text, index) => ({
                "role": index % 2 === 0 ? "user" : "model",
                "parts": [{"text": text}]
            }))
        }
        console.log(prompt);
        const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyABG8o0NIODowtmGA2ZxKHLTi9oNgdMZAA', prompt);
        const data=response.data.candidates[0].content.parts[0].text;
        console.log(data);
        return data;
    }
    const [message, setMessage] = useState('');

    const sendPrompt = async(e) => {
        e.preventDefault();
        const prompt = message;
        chatHistory.push(prompt);
        // 
        setThinking(true);
        // send prompt logic 
        const response = await askAI();
        chatHistory.push(response);
        setThinking(false);
        console.log(chatHistory);
        
    }
    const clearChatHandler = () => {
        setChatHistory([]);
        setMessage('');
    }

    return (
        <div className="chat-container">
            {isOpen && (
                <div className="chat-box">
                    {/* Clear Chat  */}
                    <button className='clearBtn' onClick={clearChatHandler}>Clear Chat</button>
                    {/* Responses  */}
                    {
                        chatHistory.map((msg, index) => (
                            <div key={index} className={`chat-msg ${index % 2 ? 'left' : 'right'}`}>
                                <div className="chat-msg-text">{msg}</div>
                            </div>
                        ))
                    }
                    {/* Thinking  */}
                    
                    {/* Send message  */}
                    <div className='send-msg'>
                        <input
                            type="text"
                            className='inp'
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                width: '80%',
                                boxSizing: 'border-box',
                                outline: 'none'
                            }}
                        />
                        <button className='btn' onClick={sendPrompt}>Go</button>
                    </div>

                </div>
            )}
            <div onClick={toggleChatBox}>
                <img className='chat-icon' src="chatbot.png" alt="" />
            </div>
        </div>
    );
};

export default ChatBox;