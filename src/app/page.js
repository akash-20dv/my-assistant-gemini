'use client';
import { useState, useEffect, useRef } from 'react';
import ChatInterface from './components/ChatInterface';
import MessageHistory from './components/MessageHistory';
import Popup from './components/Popup';
import LoadingDots from './components/LoadingDots';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState('');
  const [isGreeted, setIsGreeted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const count = localStorage.getItem('requestCount') || 0;
    setRequestCount(parseInt(count));
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (username && !isGreeted) {
      sendGreeting(username);
      setIsGreeted(true);
    }
  }, [username, isGreeted]);

  const sendGreeting = async (name) => {
    const greetingMessage = `Hello ${name}! I'm Akash Saini's AI assistant. How can I help you today?`;
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: greetingMessage, username: name }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([{ user: '', ai: data.response }]);
    } catch (error) {
      console.error('Error sending greeting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewMessage = async (message) => {
    const newCount = requestCount + 1;
    setRequestCount(newCount);
    localStorage.setItem('requestCount', newCount);

    console.log('Request count:', newCount);
    if (newCount === 10) {
      console.log('Showing popup');
      setShowPopup(true);
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message, username }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, { user: message, ai: data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameSubmit = (newUsername) => {
    setUsername(newUsername);
    setIsGreeted(false); // Reset greeting state
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-fuchsia-900 via-violet-800 to-sky-700 flex flex-col">
      <div className="flex-grow flex flex-col max-w-3xl mx-auto w-full p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">AI Chat Assistant </h1>
        {!username ? (
          <UsernameForm onSubmit={handleUsernameSubmit} />
        ) : (
          <div className="bg-slate-100/25 rounded-lg shadow-lg flex-grow flex flex-col overflow-hidden">
            <MessageHistory messages={messages} messageEndRef={messageEndRef} />
            {isLoading && (
              <div className="p-4 bg-gray-100">
                <LoadingDots />
              </div>
            )}
            <ChatInterface onSendMessage={handleNewMessage} />
          </div>
        )}
      </div>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

function UsernameForm({ onSubmit }) {
  const [inputUsername, setInputUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      onSubmit(inputUsername);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-100/25  p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Enter your name to start chatting</h2>
      <div className="flex flex-col sm:flex-row lg:flex-row md:flex-row">
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Your name"
          className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-2 sm:mt-0 lg:mt-0 md:mt-0 px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Start Chat
        </button>
      </div>
    </form>
  );
}
