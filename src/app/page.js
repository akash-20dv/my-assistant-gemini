
'use client';
import { useState, useEffect, useRef } from 'react';
import ChatInterface from './components/ChatInterface';
import MessageHistory from './components/MessageHistory';
import Popup from './components/Popup';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const count = localStorage.getItem('requestCount') || 0;
    setRequestCount(parseInt(count));
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewMessage = async (message) => {
    const newCount = requestCount + 1;
    setRequestCount(newCount);
    localStorage.setItem('requestCount', newCount);

    console.log('Request count:', newCount);
    if (newCount === 10) {
      console.log('Showing popup');
      setShowPopup(true);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message }),
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-fuchsia-900 via-violet-800 to-sky-700 flex flex-col">
      <div className="flex-grow flex flex-col max-w-3xl mx-auto w-full p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">AI Chat Assistant</h1>
        <div className="bg-slate-100/25 rounded-lg shadow-lg flex-grow flex flex-col overflow-hidden">
          <MessageHistory messages={messages} messageEndRef={messageEndRef} />
          <ChatInterface onSendMessage={handleNewMessage} />
        </div>
      </div>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
}