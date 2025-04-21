import { NavBar } from "@/components/ui/nav-bar";
import { HeroSection } from "@/components/sections/hero-section";
import { LabSection } from "@/components/sections/lab/lab-section";
export default function Home() {
  return (
    <div className="flex flex-col bg-white dark:bg-black">
      <NavBar />
      {/* Main Content */}
      <HeroSection />

      {/* Lab Section */}
      <LabSection />
    </div>
  );
}
