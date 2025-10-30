import React, { useEffect, useRef, useState } from "react";
import { AiAgent } from "../../APIRequest/AiAPI";
import { FiSend, FiUser, FiCpu, FiLoader } from "react-icons/fi";

function AIAgentComponent() {
  const [messages, setMessages] = useState([
    {
      id: "system-welcome",
      from: "agent",
      text: "Hi — I'm Inventra Core. How can I help you with INVENTRA today?",
      time: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const appendMessage = (msg) =>
    setMessages((prev) => [...prev, { ...msg, id: `${Date.now()}-${Math.random()}` }]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    appendMessage({ from: "user", text, time: new Date().toISOString() });
    setInput("");
    setLoading(true);

    try {
      const reply = await AiAgent(text);
      appendMessage({
        from: "agent",
        text: reply || "No response received",
        time: new Date().toISOString(),
      });
    } catch {
      appendMessage({
        from: "agent",
        text: "Error while processing request.",
        time: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    // ⬇️ FIX APPLIED HERE — set explicit height
    <div className="flex flex-col flex-1 overflow-hidden  bg-gray-50 rounded-lg shadow-lg">

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            {m.from !== "user" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center">
                <FiCpu size={16} />
              </div>
            )}

            <div className="max-w-[75%]">
              <div
                className={`px-3 py-2 rounded-lg text-sm shadow-sm ${
                  m.from === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-700 rounded-bl-none border"
                }`}
              >
                {m.text}
                <div className="text-[10px] text-gray-400 mt-1 text-right">
                  {formatTime(m.time)}
                </div>
              </div>
            </div>

            {m.from === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <FiUser size={16} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-gray-600">
            <FiLoader className="animate-spin" />
            <span className="text-sm">Inventra Core is thinking...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex gap-2 ">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask Inventra Core..."
          className="flex-1 resize-none text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          disabled={loading || input.trim() === ""}
          className={`px-4 flex items-center justify-center rounded-lg text-white text-sm font-medium ${
            loading || !input.trim()
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          }`}
        >
          <FiSend size={16} />
        </button>
      </div>
    </div>
  );
}

export default AIAgentComponent;
