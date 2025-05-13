import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronLeft, Settings } from "lucide-react";
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
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Back button and title */}
        <div className="flex items-center">
          <button className="mr-3 text-gray-500 hover:text-gray-700 focus:outline-none">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-medium">Doctor Smith</h1>
        </div>
        
        {/* Settings button with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
            <Settings className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
              Customize Interface
            </div>
            
            {/* Button Style Selector */}
            <div className="px-2 py-1.5">
              <div className="text-xs text-gray-500 mb-1">BUTTON STYLE</div>
              <div className="grid grid-cols-2 gap-1">
                {['style1', 'style2', 'style3', 'style4'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setButtonStyle(style as ButtonStyle)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      buttonStyle === style 
                        ? 'bg-[#36CFB3] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {style === 'style1' ? 'Teal Solid' : 
                     style === 'style2' ? 'Teal Outline' :
                     style === 'style3' ? 'Dark Mode' :
                     'Underlined'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Button Position Selector */}
            <div className="px-2 py-1.5 pt-2">
              <div className="text-xs text-gray-500 mb-1">SUGGESTION POSITION</div>
              <div className="space-y-1">
                {[
                  { value: 'above-textbox', label: 'Above Input' },
                  { value: 'below-textbox', label: 'Below Input' },
                  { value: 'right-textbox', label: 'Side Panel' }
                ].map((pos) => (
                  <button
                    key={pos.value}
                    onClick={() => setButtonPosition(pos.value as ButtonPosition)}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                      buttonPosition === pos.value 
                        ? 'bg-[#36CFB3] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
