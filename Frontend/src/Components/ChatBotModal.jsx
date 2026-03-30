import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatBotModal = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);
  const chatRef = useRef(null);

  const token = localStorage.getItem("token");

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(".chatbot-button")
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const updatedMessages = [...messages, { sender: "user", text: message }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { question: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages([
        ...updatedMessages,
        {
          sender: "bot",
          text: res.data.answer || "No response",
        },
      ]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { sender: "bot", text: "Server error. Please try again." },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="chatbot-button fixed bottom-6 right-6 
        bg-gradient-to-r from-amber-200 via-orange-400 to-amber-200
        text-white w-14 h-14 rounded-full shadow-xl 
        flex items-center justify-center text-xl 
        hover:scale-110 transition z-50"
      >
        💬
      </button>

      {open && (
        <div
          ref={modalRef}
          className="fixed bottom-20 right-6 
          w-[420px] h-[520px] max-w-[95vw] max-h-[80vh]
          bg-white shadow-2xl rounded-xl flex flex-col 
          z-50 border border-orange-200"
        >
          {/* Header */}
          <div
            className="flex justify-between items-center 
          bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400
          text-white px-4 py-3 rounded-t-xl font-semibold"
          >
            <span>Ajinkya Infotech Bot</span>

            <button
              onClick={() => setOpen(false)}
              className="hover:scale-110 transition"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-orange-50"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[75%] text-sm shadow ${
                  msg.sender === "user"
                    ? "bg-orange-500 text-white ml-auto"
                    : "bg-white text-gray-800 border"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Loader */}
            {loading && (
              <div className="bg-white border p-3 rounded-lg w-fit shadow text-gray-600 flex items-center gap-1">
                <span>Loading</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex border-t border-orange-200">
            <input
              type="text"
              className="flex-1 p-3 outline-none text-sm"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-orange-500 text-white px-5 hover:bg-orange-600 transition disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotModal;