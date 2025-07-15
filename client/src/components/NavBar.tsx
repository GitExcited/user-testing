import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, HelpCircle } from "lucide-react";
import vocalityLogo from "@assets/image_1747158009500.png";
import TestingInstructions from "@/components/instructions/TestingInstructions";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={vocalityLogo} alt="Vocality Logo" className="h-6" />
        </div>
      {/*       
        
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-[#36CFB3] focus:outline-none transition-colors">
              <HelpCircle className="mr-1 h-4 w-4" />
              <span>Comment tester</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0 w-auto">
              <TestingInstructions />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      */}
      </div>
    </nav>
  );
}