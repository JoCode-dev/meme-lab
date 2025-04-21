import { NavBar } from "@/components/ui/nav-bar";
import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <div className="flex bg-white dark:bg-black">
      <NavBar />
      {/* Main Content */}
      <HeroSection />
    </div>
  );
}
