import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ButtonStyle, ButtonPosition } from "@/lib/styleUtils";

interface SuggestionAppProps {
  buttonStyle: ButtonStyle;
  buttonPosition: ButtonPosition;
}

const SUGGESTIONS = [
  "Tell me more about Vizology",
  "What are the key features?",
  "How does AI integration work?",
  "Show me case studies",
  "Get a demo"
];

export default function SuggestionApp({ 
  buttonStyle, 
  buttonPosition 
}: SuggestionAppProps) {
  const [userInput, setUserInput] = useState("");
  const { toast } = useToast();

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
  };

  const handleSpeak = () => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      toast({
        title: "Speech Recognition",
        description: "Speech recognition would start here in a real implementation.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Determine the container class based on position
  const containerClass = `max-w-4xl mx-auto position-${buttonPosition} ${buttonStyle}-buttons`;
  
  // Create suggestion elements
  const suggestionElements = (
    <div className="suggestions">
      <div className="text-gray-700 mb-2 font-medium">Suggested phrases:</div>
      <div className={`suggestion-buttons ${buttonPosition === "stacked" ? "flex-col" : "flex-wrap"}`}>
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

  // Create input container
  const inputContainer = (
    <div className="input-container">
      <div className="relative">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here or click a suggestion..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00c8b3] focus:border-transparent resize-none"
          rows={3}
        />
        <Button
          onClick={handleSpeak}
          className="absolute bottom-3 right-3 bg-[#00c8b3] text-white rounded-full w-10 h-10 p-0 flex items-center justify-center focus:outline-none hover:bg-opacity-90"
        >
          <Mic className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  // Render the components based on position
  return (
    <div className={containerClass}>
      {buttonPosition === "above-textbox" && (
        <>
          {suggestionElements}
          {inputContainer}
        </>
      )}
      
      {buttonPosition === "below-textbox" && (
        <>
          {inputContainer}
          {suggestionElements}
        </>
      )}
      
      {buttonPosition === "right-textbox" && (
        <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
          {inputContainer}
          {suggestionElements}
        </div>
      )}
      
      {buttonPosition === "stacked" && (
        <>
          {inputContainer}
          {suggestionElements}
        </>
      )}
    </div>
  );
}
