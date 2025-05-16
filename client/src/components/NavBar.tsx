import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ButtonStyle, ButtonPosition } from "@/lib/styleUtils";
import vocalifyLogo from "@assets/image_1747158009500.png";

interface NavBarProps {
  buttonStyle: ButtonStyle;
  setButtonStyle: (style: ButtonStyle) => void;
  buttonPosition: ButtonPosition;
  setButtonPosition: (position: ButtonPosition) => void;
}

export default function NavBar({
  buttonStyle,
  setButtonStyle,
  buttonPosition,
  setButtonPosition
}: NavBarProps) {
  return (
    <nav className="bg-white shadow-md px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={vocalifyLogo} alt="Vocalify Logo" className="h-8" />
        </div>
        
        {/* Dropdowns on the right */}
        <div className="flex items-center space-x-4">
          {/* Style Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-[#36CFB3] focus:outline-none">
              <span>Button Style</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className={buttonStyle === "style1" ? "bg-gray-100" : ""} 
                onClick={() => setButtonStyle("style1")}
              >
                Style 1
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={buttonStyle === "style2" ? "bg-gray-100" : ""} 
                onClick={() => setButtonStyle("style2")}
              >
                Style 2
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={buttonStyle === "style3" ? "bg-gray-100" : ""} 
                onClick={() => setButtonStyle("style3")}
              >
                Style 3
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={buttonStyle === "style4" ? "bg-gray-100" : ""} 
                onClick={() => setButtonStyle("style4")}
              >
                Style 4
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Position Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-[#36CFB3] focus:outline-none">
              <span>Button Position</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className={buttonPosition === "above-textbox" ? "bg-gray-100" : ""} 
                onClick={() => setButtonPosition("above-textbox")}
              >
                Above Textbox
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={buttonPosition === "below-textbox" ? "bg-gray-100" : ""} 
                onClick={() => setButtonPosition("below-textbox")}
              >
                Below Textbox
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={buttonPosition === "right-textbox" ? "bg-gray-100" : ""} 
                onClick={() => setButtonPosition("right-textbox")}
              >
                Right of Textbox
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
