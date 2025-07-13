import vocalityLogo from "@assets/image_1747158009500.png";

export default function LandingHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={vocalityLogo} alt="Vocality" className="h-8" />
            
          </div>
          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Étude utilisateur • 15-20 min
          </div>
        </div>
      </div>
    </header>
  );
}