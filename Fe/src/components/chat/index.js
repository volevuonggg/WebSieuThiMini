import React, { useState } from 'react';
import ChatBox from './ChatBox';
import chatIcon from '../../assets/chat/chat.png';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
      <div
        className="chat-container"
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Open chat"
      >
        <img src={chatIcon} alt="Chat icon" width={32} height={32} />
      </div>
    </>
  );
};

export default ChatWidget;
