import React, { useState } from 'react';

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hello! How can I help you today?' }
  ]);

  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prevMes) => [...prevMes, { from: 'user', text: userMessage }]);
    setInput('');

    try {
      const res = await fetch('https://leuyenn.app.n8n.cloud/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const reply = data.output || '🤖 Rất tiếc, tôi không có câu trả lời cho câu hỏi của bạn.';

      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'bot', text: '⚠️ Có lỗi xảy ra. Vui lòng thử lại' }]);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h2>Chatbot</h2>
        <button onClick={onClose}>&times;</button>
      </div>

      <div className="chatbox-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chatbox-message ${msg.from === 'user' ? 'user-message' : 'bot-message'
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chatbox-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
