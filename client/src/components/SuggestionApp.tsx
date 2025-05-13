import { useState } from "react";
import { Send, Heart, Volume2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ButtonStyle, ButtonPosition } from "@/lib/styleUtils";

interface SuggestionAppProps {
  buttonStyle: ButtonStyle;
  buttonPosition: ButtonPosition;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  liked?: boolean;
}

const SUGGESTIONS = [
  "Can you suggest some good movies?",
  "What's the best restaurant nearby?",
  "How does this app work?",
  "Tell me a fun fact",
  "Generate a poem"
];

export default function SuggestionApp({ 
  buttonStyle, 
  buttonPosition 
}: SuggestionAppProps) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi there! How can I help you today?", isUser: false }
  ]);
  const { toast } = useToast();

  // Function to generate a random ID
  const generateId = () => Math.random().toString(36).substring(2, 11);

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
    
    // Also speak the suggestion
    toast({
      title: "Speaking Suggestion",
      description: `"${suggestion}" would be spoken in a real implementation.`,
      duration: 3000,
    });
  };

  const handleSend = () => {
    if (!userInput.trim()) return;
    
    // Add user message to chat
    const newUserMessage: Message = {
      id: generateId(),
      text: userInput,
      isUser: true
    };
    setMessages(prev => [...prev, newUserMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'm here to help you with that!",
        "Great question! Let me think about that.",
        "Thanks for asking. Here's what I know:",
        "I'd be happy to assist with that.",
        "That's an interesting question."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse: Message = {
        id: generateId(),
        text: randomResponse,
        isUser: false
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    // Clear input
    setUserInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (userInput.trim()) {
        // Add user message to chat
        const newUserMessage: Message = {
          id: generateId(),
          text: userInput,
          isUser: true
        };
        setMessages(prev => [...prev, newUserMessage]);
        
        // Simulate AI response
        setTimeout(() => {
          const responses = [
            "I'm here to help you with that!",
            "Great question! Let me think about that.",
            "Thanks for asking. Here's what I know:",
            "I'd be happy to assist with that.",
            "That's an interesting question."
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          const aiResponse: Message = {
            id: generateId(),
            text: randomResponse,
            isUser: false
          };
          
          setMessages(prev => [...prev, aiResponse]);
        }, 1000);
        
        // Clear input
        setUserInput("");
      }
    }
  };

  const toggleLike = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, liked: !msg.liked } : msg
    ));
  };

  const handleSpeak = () => {
    // In a real implementation, we would use the Web Speech API
    // For this demo, we'll just show a toast message
    if (userInput.trim()) {
      toast({
        title: "Speaking Text",
        description: `"${userInput}" would be spoken in a real implementation.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Text-to-Speech",
        description: "Type a message first or click a suggestion to have it spoken.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={message.isUser ? "user-message" : "ai-message"}
          >
            {message.text}
            {!message.isUser && (
              <button 
                onClick={() => toggleLike(message.id)} 
                className="ml-2 mt-1 text-gray-400 hover:text-pink-500 focus:outline-none"
                aria-label="Like message"
              >
                <Heart 
                  className={`h-4 w-4 inline ${message.liked ? "fill-pink-500 text-pink-500" : ""}`} 
                />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {buttonPosition === "above-textbox" && (
        <div className="px-4 suggestion-buttons">
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-button"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button 
          onClick={handleSpeak}
          className="chat-send-button"
          title="Click to have text spoken (Text-to-Speech)"
        >
          <Volume2 className="h-5 w-5" />
        </button>
      </div>
      
      {buttonPosition === "below-textbox" && (
        <div className="p-4 bg-white suggestion-buttons">
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-button"
            >
              {suggestion}
            </button>
          ))}
          <button className="suggestion-button flex items-center">
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Generate More
          </button>
        </div>
      )}
      
      {buttonPosition === "right-textbox" && (
        <div className="px-4 py-2 bg-white border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-2">SUGGESTIONS</div>
          <div className="suggestion-buttons">
            {SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-button"
              >
                {suggestion}
              </button>
            ))}
            <button className="suggestion-button flex items-center">
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Generate More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
