import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css'; // Import your CSS file for styling

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chat = model.startChat();

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]); // For storing previous messages

    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });  // Scroll smoothly to the bottom
        }
    }, [history]);


    // Function to replace newline characters with <br />
    const formatResponse = (text) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };


    const sendPrompt = async (e) => {
        e.preventDefault();

        setMessage(''); 
        const prompt = message;
        setIsLoading(true);

        try {
            const result = await chat.sendMessage(prompt);
            console.log(result);

            const response = result.response.text();

            if (response) {
                // Update the history with the new message and response
                setHistory([...history, { prompt, response }]);
            }
            console.log(history);

        } catch (error) {
            console.error("Error sending prompt:", error);
        }
        finally {
            setIsLoading(false);
        }

    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendPrompt(e);
        }
    };

    const clearChatHandler = () => {
        setHistory([]);
        setMessage('');
    }

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="chat-container">
            {isOpen &&

                <div className="chat-box">
                    <div className='top-bar'>
                        <button className='btn top-bar-btn' onClick={clearChatHandler}>Clear Chat</button>
                        <button className='btn top-bar-btn' onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                    
                    <div className='Conversation-box'>
                        {
                            history.map((entry, index) => (
                                <div key={index} className='chat-pair'>
                                    <p className="chat-msg prompt">
                                        {entry.prompt}
                                    </p>
                                    <p className="chat-msg response">
                                        {formatResponse(entry.response)}
                                    </p>
                                </div>
                            ))
                        }

                        {isOpen && !history.length && !isLoading &&
                            <div className='empty-chats'>
                                <div className='text-container'>
                                    <h2>Stuck? </h2>
                                    <h2>Your AI buddy is here to help!</h2>
                                </div>
                                <p>Powered by <span>Gemini AI</span></p>
                            </div>
                        }
                        <div ref={bottomRef}></div>

                    </div>

                    {  isLoading &&
                        <div className='loading' >
                            <img src="loading.gif" alt="" />
                        </div>
                    }

                    <div className='send-msg'>
                        <input
                            type="text"
                            className='inp'
                            placeholder="Type your query..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
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
                        <button className='btn input-btn' onClick={sendPrompt} >Ask AI</button>
                    </div>

                </div>
            }

            <div onClick={toggleChatBox}>
                <img className='chat-icon' src="bot.gif" alt="Gemini AI" title='Gemini AI' />
            </div>
        </div>
    );
};

export default ChatBox;