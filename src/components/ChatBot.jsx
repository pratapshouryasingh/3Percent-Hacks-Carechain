import { useState, useRef, useEffect } from "react";
import "../App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import systemPrompt from "../prompt";

function ChatBot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    if (e) e.preventDefault();
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion("");
    setGeneratingAnswer(true);
    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const response = await axios({
        method: "post",
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
        data: {
          contents: [
            systemPrompt,
            ...chatHistory.map((item) => ({
              role: item.type === "question" ? "user" : "model",
              parts: [{ text: item.content }],
            })),
            {
              role: "user",
              parts: [{ text: currentQuestion }],
            },
          ],
        },
      });

      const aiResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";

      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);
    } catch (err) {
      console.error("API Error:", err);
      const errorMsg = "Sorry - Something went wrong. Please try again!";
      setChatHistory((prev) => [...prev, { type: "answer", content: errorMsg }]);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-md p-4">
      {/* Quick Questions */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          "What should I do for a headache?",
          "Give me a simple fitness plan.",
          "What’s a healthy Indian diet?",
          "First aid for minor burns?",
          "How to reduce stress naturally?",
        ].map((topic, i) => (
          <button
            key={i}
            onClick={() => {
              setQuestion(topic);
              generateAnswer({ preventDefault: () => {} });
            }}
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition"
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Chat History */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 rounded-lg bg-gray-50 shadow-inner p-3 hide-scrollbar"
      >
        {chatHistory.length === 0 ? (
          <div className="text-gray-500 text-center py-10">
            Ask me anything about symptoms, fitness, or diet.
          </div>
        ) : (
          chatHistory.map((chat, idx) => (
            <div
              key={idx}
              className={`mb-3 ${chat.type === "question" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block max-w-[80%] p-3 rounded-lg overflow-auto hide-scrollbar ${
                  chat.type === "question"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <ReactMarkdown>{chat.content}</ReactMarkdown>
              </div>
            </div>
          ))
        )}

        {generatingAnswer && (
          <div className="text-left">
            <div className="inline-block bg-gray-100 p-3 rounded-lg animate-pulse">Thinking...</div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={generateAnswer} className="bg-white rounded-lg p-2 border flex gap-2">
        <textarea
          required
          className="flex-1 border border-gray-300 rounded p-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your health or fitness question..."
          rows="2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              generateAnswer(e);
            }
          }}
        ></textarea>
        <button
          type="submit"
          disabled={generatingAnswer}
          className={`px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
            generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
