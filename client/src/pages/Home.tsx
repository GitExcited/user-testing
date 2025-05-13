import { useState } from "react";
import NavBar from "@/components/NavBar";
import SuggestionApp from "@/components/SuggestionApp";
import { ButtonStyle, ButtonPosition } from "@/lib/styleUtils";

export default function Home() {
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>("style1");
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>("above-textbox");
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar 
        buttonStyle={buttonStyle}
        setButtonStyle={setButtonStyle}
        buttonPosition={buttonPosition}
        setButtonPosition={setButtonPosition}
      />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <SuggestionApp
          buttonStyle={buttonStyle}
          buttonPosition={buttonPosition}
        />
      </main>
    </div>
  );
}
