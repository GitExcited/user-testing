import { useState } from "react";
import { Heart, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ButtonStyle, ButtonPosition } from "@/lib/styleUtils";
import vocalifyLogo from "@assets/image_1747158009500.png";

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
  "Where is the",
  "What's the",
  "How does this"
];

export default function SuggestionApp({ 
  buttonStyle, 
  buttonPosition 
}: SuggestionAppProps) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  // Function to generate a random ID
  const generateId = () => Math.random().toString(36).substring(2, 11);

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
    
    // Speak the suggestion using Web Speech API if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(suggestion);
      window.speechSynthesis.speak(utterance);
      
      toast({
        title: "Speaking Suggestion",
        description: `"${suggestion}" is being spoken.`,
        duration: 3000,
      });
    } else {
      // Fallback to toast if speech synthesis isn't available
      toast({
        title: "Speaking Suggestion",
        description: `"${suggestion}" would be spoken in a real implementation.`,
        duration: 3000,
      });
    }
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
    if (userInput.trim()) {
      // Try to use the actual Web Speech API if available
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(userInput);
        window.speechSynthesis.speak(utterance);
        
        toast({
          title: "Speaking Text",
          description: `"${userInput}" is being spoken.`,
          duration: 3000,
        });
      } else {
        // Fallback to toast if speech synthesis isn't available
        toast({
          title: "Speaking Text",
          description: `"${userInput}" would be spoken in a real implementation.`,
          duration: 3000,
        });
      }
      
      // Send the text as a message if it hasn't been sent yet
      const newUserMessage: Message = {
        id: generateId(),
        text: userInput,
        isUser: true
      };
      setMessages(prev => [...prev, newUserMessage]);
      
      // Clear input
      setUserInput("");
    } else {
      toast({
        title: "Text-to-Speech",
        description: "Type a message first or click a suggestion to have it spoken.",
        duration: 3000,
      });
    }
  };

  // Determine the container class based on position
  const containerClass = `chat-container position-${buttonPosition} ${buttonStyle}-buttons`;
  
  // Create suggestion elements - consistent for all positions
  const suggestionElements = (
    <div className="suggestions">
      <div className={`suggestion-buttons ${buttonStyle}-buttons`}>
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
    </div>
  );
  
  // Chat input container - consistent for all positions
  const inputContainer = (
    <div className="input-container">
      <div className="relative">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (userInput.trim()) {
                handleKeyDown(e as any);
              }
            }
          }}
          placeholder="Type your message here or click a suggestion..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#36CFB3] focus:border-transparent resize-none"
          rows={3}
        />
        <button
          onClick={handleSpeak}
          className="absolute bottom-3 right-3 bg-[#ED9390] text-white rounded-full w-10 h-10 p-0 flex items-center justify-center focus:outline-none hover:bg-opacity-90"
          title="Click to have text spoken (Text-to-Speech)"
        >
          <Volume2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  // Chat messages container - consistent for all positions
  const messagesContainer = (
    <div className="chat-messages">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={message.isUser ? "user-message" : "ai-message"}
        >
          <div className="flex justify-between items-start">
            <div>{message.text}</div>
            <button 
              onClick={() => toggleLike(message.id)} 
              className="ml-3 text-gray-400 hover:text-pink-500 focus:outline-none"
              aria-label="Like message"
            >
              <Heart 
                className={`h-5 w-5 ${message.liked ? "fill-pink-500 text-pink-500" : ""}`} 
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Render the components based on position
  return (
    <div className="flex flex-col min-h-screen">
      {/* Vocalify Logo Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <img src={vocalifyLogo} alt="Vocalify Logo" className="h-10" />
      </div>
      
      <div className={containerClass}>
        {buttonPosition === "above-textbox" && (
          <>
            {suggestionElements}
            {messagesContainer}
            {inputContainer}
          </>
        )}
        
        {buttonPosition === "below-textbox" && (
          <>
            {messagesContainer}
            {inputContainer}
            {suggestionElements}
          </>
        )}
        
        {buttonPosition === "right-textbox" && (
          <div className="flex flex-col md:flex-row gap-4 h-full">
            <div className="flex-1 flex flex-col">
              {messagesContainer}
              {inputContainer}
            </div>
            <div className="md:w-64 flex-shrink-0">
              {suggestionElements}
            </div>
          </div>
        )}
        
        {/* Footer text */}
        <div className="text-right mt-auto pt-4 text-gray-400 text-sm">
          Activate Windows
        </div>
      </div>
    </div>
  );
}
