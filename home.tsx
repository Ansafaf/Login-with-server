import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Phone, Video, Mic, MicOff, Camera, CameraOff, Users, Settings } from 'lucide-react';

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', text: 'Hey! How are you doing?', time: '10:30 AM', type: 'text' },
    { id: 2, sender: 'You', text: 'I\'m good! Working on a new project.', time: '10:32 AM', type: 'text' },
    { id: 3, sender: 'Alice', text: 'That sounds exciting! What kind of project?', time: '10:33 AM', type: 'text' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [callType, setCallType] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [activeContacts] = useState([
    { name: 'Alice Johnson', status: 'online', country: 'USA' },
    { name: 'Bob Smith', status: 'away', country: 'UK' },
    { name: 'Carol Davis', status: 'online', country: 'Canada' },
    { name: 'David Wilson', status: 'offline', country: 'Australia' }
  ]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      
      // Simulate response
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          sender: 'Alice',
          text: 'Thanks for sharing! This chat demo looks great.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileMsg = {
        id: Date.now(),
        sender: 'You',
        text: `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'file'
      };
      setMessages(prev => [...prev, fileMsg]);
    }
  };

  const startCall = (type) => {
    setIsInCall(true);
    setCallType(type);
  };

  const endCall = () => {
    setIsInCall(false);
    setCallType('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h1 className="text-xl font-bold">Global Chat</h1>
          <p className="text-sm opacity-90">Connect worldwide</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Contacts ({activeContacts.length})
            </h3>
            {activeContacts.map((contact, index) => (
              <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {contact.name.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`}></div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-medium text-gray-900">{contact.name}</div>
                  <div className="text-xs text-gray-500">{contact.country} • {contact.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
              A
            </div>
            <div>
              <h2 className="font-semibold">Alice Johnson</h2>
              <p className="text-sm text-green-600">🟢 Online • USA</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => startCall('voice')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isInCall}
            >
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => startCall('video')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isInCall}
            >
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Call Interface */}
        {isInCall && (
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 text-white p-6 flex flex-col items-center">
            <div className="text-lg font-semibold mb-2">
              {callType === 'video' ? '📹 Video Call' : '📞 Voice Call'} with Alice
            </div>
            <div className="text-sm opacity-75 mb-4">Connected • USA to Your Location</div>
            {callType === 'video' && (
              <div className="bg-gray-800 rounded-lg p-8 mb-4">
                <div className="text-center text-gray-400">Video feed would appear here</div>
              </div>
            )}
            <div className="flex space-x-4">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-full ${isMicOn ? 'bg-gray-700' : 'bg-red-600'}`}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              {callType === 'video' && (
                <button
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  className={`p-3 rounded-full ${isCameraOn ? 'bg-gray-700' : 'bg-red-600'}`}
                >
                  {isCameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={endCall}
                className="p-3 rounded-full bg-red-600 hover:bg-red-700"
              >
                <Phone className="w-5 h-5 transform rotate-[135deg]" />
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'You' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'bg-white border shadow-sm'
              }`}>
                <p className={`text-sm ${message.type === 'file' ? 'font-medium' : ''}`}>
                  {message.text}
                </p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'You' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t p-4">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}