import NavBar from "@/components/NavBar";
import TypingTestApp from "@/components/TypingTestApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-grow">
        <TypingTestApp />
      </main>
    </div>
  );
}