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

// Initial suggestions
const INITIAL_SUGGESTIONS = [
  "Where is the",
  "What's the",
  "How does this"
];

// Follow-up suggestions based on first selection
const FOLLOW_UP_SUGGESTIONS = {
  "Where is the": ["nearest restaurant", "bathroom", "exit"],
  "What's the": ["weather today", "time", "best option"],
  "How does this": ["work", "look", "compare to others"]
};

export default function SuggestionApp({ 
  buttonStyle, 
  buttonPosition 
}: SuggestionAppProps) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [suggestionPhase, setSuggestionPhase] = useState<"initial" | "followUp">("initial");
  const [selectedInitialSuggestion, setSelectedInitialSuggestion] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to generate a random ID
  const generateId = () => Math.random().toString(36).substring(2, 11);

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestionPhase === "initial") {
      // Store the first part of the sentence
      setSelectedInitialSuggestion(suggestion);
      // Set the user input to the selected suggestion
      setUserInput(suggestion);
      // Update to follow-up suggestions
      setSuggestions(FOLLOW_UP_SUGGESTIONS[suggestion as keyof typeof FOLLOW_UP_SUGGESTIONS]);
      setSuggestionPhase("followUp");
    } else {
      // Combine initial suggestion with follow-up
      const fullText = `${selectedInitialSuggestion} ${suggestion}`;
      setUserInput(fullText);
      
      // Reset to initial suggestions for next interaction
      setSuggestions(INITIAL_SUGGESTIONS);
      setSuggestionPhase("initial");
      setSelectedInitialSuggestion(null);
    }
    
    // Note: We no longer automatically speak the suggestion
    // Now it only speaks when the volume button is clicked
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
    // Only speak the text when the speak button is clicked
    if (userInput.trim()) {
      // Use the Web Speech API if available
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
          title: "Text-to-Speech",
          description: `"${userInput}" would be spoken in a real implementation.`,
          duration: 3000,
        });
      }
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
        {suggestions.map((suggestion, index) => (
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
          className="w-full border-none rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#36CFB3] resize-none shadow-sm"
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
  // Functional keyboard component that adds characters to text field
  const handleKeyPress = (key: string) => {
    if (key === 'SPACE') {
      setUserInput(prev => prev + ' ');
    } else if (key === 'BACKSPACE') {
      setUserInput(prev => prev.slice(0, -1));
    } else {
      setUserInput(prev => prev + key.toLowerCase());
    }
  };
  
  const keyboardComponent = (
    <div className="virtual-keyboard mt-6 mx-auto bg-white rounded-t-lg shadow-lg max-w-4xl w-full py-3">
      <div className="grid grid-cols-10 gap-1 px-4 mb-2">
        {['q','w','e','r','t','y','u','i','o','p'].map(key => (
          <button 
            key={key}
            onClick={() => handleKeyPress(key)} 
            className="bg-gray-50 rounded-md h-10 flex items-center justify-center text-gray-600 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200"
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-9 gap-1 px-8 mb-2">
        {['a','s','d','f','g','h','j','k','l'].map(key => (
          <button 
            key={key}
            onClick={() => handleKeyPress(key)} 
            className="bg-gray-50 rounded-md h-10 flex items-center justify-center text-gray-600 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200"
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 px-12 mb-2">
        {['z','x','c','v','b','n','m'].map(key => (
          <button 
            key={key}
            onClick={() => handleKeyPress(key)} 
            className="bg-gray-50 rounded-md h-10 flex items-center justify-center text-gray-600 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200"
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 px-16">
        <button 
          onClick={() => handleKeyPress('BACKSPACE')} 
          className="bg-gray-50 rounded-md h-10 flex items-center justify-center text-gray-600 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200"
        >
          BACKSPACE
        </button>
        <button 
          onClick={() => handleKeyPress('SPACE')} 
          className="bg-gray-50 rounded-md h-10 flex items-center justify-center text-gray-600 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200"
        >
          SPACE
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] overflow-hidden">
      {buttonPosition === "above-textbox" && (
        <div className="flex flex-col h-full">
          <div className="flex justify-center mt-4">
            {suggestionElements}
          </div>
          
          <div className="mt-4 flex-grow flex justify-center items-center">
            <div className="w-[500px]">
              {inputContainer}
            </div>
          </div>
          
          {/* Add virtual keyboard at bottom */}
          {keyboardComponent}
        </div>
      )}
      
      {buttonPosition === "below-textbox" && (
        <div className="flex flex-col h-full">
          <div className="flex justify-center items-center flex-grow">
            <div className="w-[500px]">
              {inputContainer}
            </div>
          </div>
          
          <div className="flex justify-center mt-4 mb-10">
            {suggestionElements}
          </div>
          
          {/* Add virtual keyboard at bottom */}
          {keyboardComponent}
        </div>
      )}
      
      {buttonPosition === "right-textbox" && (
        <div className="flex flex-col h-full">
          <div className="flex mt-4">
            <div className="flex justify-center items-center flex-grow">
              <div className="w-[500px]">
                {inputContainer}
              </div>
            </div>
            
            <div className="flex flex-col justify-center mr-16">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`suggestion-button ${buttonStyle}-buttons mb-4`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          {/* Add virtual keyboard at bottom */}
          {keyboardComponent}
        </div>
      )}
    </div>
  );
}
