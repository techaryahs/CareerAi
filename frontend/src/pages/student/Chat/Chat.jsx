import React, { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import ReactMarkdown from "react-markdown";
import './Chat.css';
import PremiumPopup from '../../../components/PremiumPlans/PremiumPlans';
import PageLoader from '../../../components/PageLoader/PageLoader';
import { useAuth } from '../../../context/AuthContext';
const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("career_chat_messages");

    return savedMessages
      ? JSON.parse(savedMessages)
      : [
        {
          sender: 'bot',
          text: '👋 Hi! I’m your AI Career Assistant. Ask me anything.',
        },
      ];
  });

  useEffect(() => {
    localStorage.setItem(
      "career_chat_messages",
      JSON.stringify(messages)
    );
  }, [messages]);


  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [user, setUser] = useState(() => useAuth().user);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ SINGLE SOURCE OF API TRUTH
  const API =  import.meta.env.VITE_CHATAPI_URL;

  const thinkingTexts = [
    "Thinking...",
    // "Analyzing your question...",
    // "Doing deep research...",
    // "Connecting career data...",
    // "Evaluating best paths...",
    // "Reasoning carefully...",
    // "Generating a personalized answer..."
  ];

  const [thinkingIndex, setThinkingIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setThinkingIndex(prev =>
        prev === thinkingTexts.length - 1 ? 0 : prev + 1
      );
    }, 1500); // change text every 1.5 sec

    return () => clearInterval(interval);
  }, [loading]);



  // ======================
  // TYPEWRITER EFFECT
  // ======================
  const typeWriter = async (text) => {
    return new Promise((resolve) => {
      let i = 0;

      setMessages(prev => [...prev, { sender: "bot_typing", text: "" }]);

      const interval = setInterval(() => {
        i++;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = text.substring(0, i);
          return updated;
        });

        if (i >= text.length) {
          clearInterval(interval);
          setMessages(prev => {
            const clean = prev.filter(m => m.sender !== "bot_typing");
            return [...clean, { sender: "bot", text }];
          });
          resolve();
        }
      }, 12);
    });
  };

  // ======================
  // PAGE LOADER
  // ======================
  useEffect(() => {
    const timeout = setTimeout(() => setPageLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  // ======================
  // SCROLL TO BOTTOM
  // ======================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ======================
  // SEND MESSAGE (API ONLY)
  // ======================
  const handleSend = async () => {
  if (!input.trim()) return;

  const newCount = messageCount + 1;

  // 🔒 Premium limit
  if (!user?.isPremium && newCount > 2) {
    setShowPremiumPopup(true);
    return;
  }

  setMessageCount(newCount);

  // 👤 Add user message
  const userMessage = { sender: 'user', text: input };
  setMessages(prev => [...prev, userMessage]);

  setInput('');
  setLoading(true);

  try {
    // ✅ SEND WHAT YOUR API EXPECTS
    const res = await fetch(`${API}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage.text
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    // ===============================
    // 🔥 PARSE AI REPLY
    // ===============================
    let finalReply = "⚠️ No response from AI.";

    try {
      const parsed =
        typeof data.reply === "string"
          ? JSON.parse(data.reply)
          : data.reply;

      finalReply =
        parsed.response ||
        parsed.answer ||
        data.reply ||
        finalReply;

    } catch {
      finalReply = data.reply;
    }

    // ===============================
    // ⭐ READ RECOMMENDATIONS
    // ===============================
    const suggestions = Array.isArray(data.suggestions)
      ? data.suggestions
      : [];

    // ===============================
    // 🤖 ADD BOT MESSAGE + SUGGESTIONS
    // ===============================
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: finalReply,
        suggestions
      }
    ]);

  } catch (err) {
    console.log(err)
    console.error("Chat API Error:", err);
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: "❌ Unable to connect to AI service.",
        suggestions: []
      }
    ]);
  }

  setLoading(false);
};



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  if (pageLoading) return <PageLoader />;

  const handleSuggestionClick = (text) => {
    setInput(text);
    setTimeout(() => handleSend(), 100);
  };

  const clearChat = () => {
    const ok = window.confirm("Are you sure you want to clear the chat?");
    if (!ok) return;

    localStorage.removeItem("career_chat_messages");

    setMessages([
      {
        sender: 'bot',
        text: '👋 Hi! I’m your AI Career Assistant. Ask me anything.',
      },
    ]);

    setMessageCount(0);
  };



  return (
    <div className="chat-container">
      <div className="chat-box-wrapper">
        {/* 🔹 HEADER WITH CLEAR CHAT */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-title">🎓 CareerGenAI Assistant</div>
            <div className="chat-subtitle">AI-powered career guidance</div>
          </div>

          <button
            className="clear-chat-btn"
            onClick={clearChat}
            title="Clear chat"
          >
            ⟲
          </button>
        </div>


        {/* 🔹 CHAT BOX */}
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender}`}>
              {msg.sender === "bot" ? (
                <div className="bot-response-card markdown-output">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>

                  {/* 🔹 Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="suggestions">
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          className="suggestion-chip"
                          onClick={() => handleSuggestionClick(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="user-message">{msg.text}</div>
              )}
            </div>
          ))}

          {/* 🔹 TYPING INDICATOR */}
          {loading && (
            <div className="chat-bubble bot">
              <div className="bot-response-card thinking-text">
                ⏳ {thinkingTexts[thinkingIndex]}
              </div>
            </div>
          )}


          <div ref={messagesEndRef} />
        </div>

        {/* 🔹 INPUT */}
        <div className="chat-input">
          <input
            type="text"
            value={input}
            placeholder="Ask me anything..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <span onClick={handleSend} className="send-btn">
            {loading ? '...' : <FiSend size={20} />}
          </span>
        </div>
      </div>


      {showPremiumPopup && (
        <PremiumPopup
          onClose={() => setShowPremiumPopup(false)}
          onUpgrade={() => {
            const updatedUser = JSON.parse(localStorage.getItem('user'));
            setUser(updatedUser);
            setMessageCount(0);
            setShowPremiumPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Chat;
