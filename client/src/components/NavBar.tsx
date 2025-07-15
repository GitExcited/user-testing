import { Link } from "react-router-dom";
import vocalityLogo from "@/../attached_assets/image_1747158009500.png";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center">
            <img src={vocalityLogo} alt="Vocality Logo" className="h-6" />
          </div>
        </Link>
      </div>
    </nav>
  );
}
