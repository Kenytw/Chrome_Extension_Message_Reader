/*global chrome*/
import React, { useEffect, useState } from 'react';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    chrome.storage.local.get('messages', (result) => {
      if (chrome.runtime.lastError) {
        setError(chrome.runtime.lastError.message);
        setLoading(false);
      } else {
        setMessages(result.messages || []);
        setLoading(false);

        // eslint-disable-next-line array-callback-return
        result.messages.map((message) => {
          if (message.priority === 'high' && message.read === false) {
            const audio = new Audio('assets/notification.wav');
            audio.play();
          }
        });
      }
    });
  }, []);

  const markAsReadOrNot = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, read: !msg.read } : msg
    );
    setMessages(updatedMessages);

    chrome.storage.local.set({ messages: updatedMessages });
    chrome.storage.local.get(['messages']).then((result) => {
      const storedMessages = result.messages || [];
      const unreadCount = storedMessages.filter(msg => !msg.read).length;
      chrome.action.setBadgeText({ text: unreadCount.toString() });
    });
  };

  if (loading) {
    return <p className="text-sm font-semibold leading-6 text-gray-900">Loading messages...</p>;
  }

  if (error) {
    return <p className="text-sm font-semibold leading-6 text-gray-900">Error loading messages: {error}</p>;
  }

  if (messages.length === 0) {
    return <p className="text-sm font-semibold leading-6 text-gray-900">No messages available.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {messages.map((message) => (
          <li key={message.id} className={`message ${message.read ? 'read' : ''}`}>
            <div className="grid grid-cols-10 gap-x-5 px-0.5">
              <div className="h-12">
                {message.priority === 'high' &&
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-red-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500"/>
                      </div>
                    </div>
                }
              </div>
              <div className="col-span-8 h-12">
                <p className={`text-sm ${message.read ? 'font-semi' : 'font-semibold'} leading-6 text-gray-900`}>{message.content}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
              </div>
              <div className="h-12">
                <div className="mt-1 flex items-center gap-x-1.5">
                  <input type="checkbox" className="accent-emerald-500/25" checked={!!message.read}
                         onClick={() => markAsReadOrNot(message.id)}/>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default MessageList;
