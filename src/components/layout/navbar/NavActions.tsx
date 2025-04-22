
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TranslatedText from "@/components/ui/TranslatedText";
import LanguageSelector from "../LanguageSelector";
import { useDisplayMode } from "@/contexts/DisplayModeContext";
import { Accessibility } from "lucide-react";

const NavActions = () => {
  const { displayMode, toggleDisplayMode } = useDisplayMode();

  return (
    <div className="hidden md:flex items-center space-x-3">
      <Button 
        variant="default" 
        className="bg-sapp-blue hover:bg-sapp-blue/90 text-white rounded-md group relative overflow-hidden"
        asChild
      >
        <Link to="/client-area" className="inline-flex items-center justify-center gap-2">
          <span className="relative z-10 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-0">
            <TranslatedText textKey="clientArea" />
          </span>
          <span className="absolute inset-0 flex items-center justify-center z-0 -translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <TranslatedText textKey="accessNow" />
          </span>
        </Link>
      </Button>
    
      <Button 
        variant="default" 
        className="bg-[#DB2626] hover:bg-[#DB2626]/90 text-white rounded-md group relative overflow-hidden whitespace-nowrap shadow-lg shadow-red-600/20"
        asChild
      >
        <a href="/#contact" className="inline-flex items-center justify-center gap-2">
          <span className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:opacity-0">
            <TranslatedText textKey="getInTouch" />
          </span>
          <span className="absolute inset-0 flex items-center justify-center z-0 scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <TranslatedText textKey="contactUs" />
          </span>
        </a>
      </Button>
      <button
        type="button"
        aria-label="Toggle display mode"
        onClick={toggleDisplayMode}
        className={`relative inline-flex items-center px-3 py-2 rounded-md ring-1 ring-sapp-blue bg-white text-sapp-blue hover:bg-blue-50 transition-colors focus:outline-none ml-2 ${
          displayMode === "high-contrast" ? "animate-pulse bg-sapp-blue text-white" : ""
        }`}
        title={
          displayMode === "high-contrast"
            ? "Switch to easy read background"
            : "Switch to high contrast"
        }
      >
        <Accessibility className="w-5 h-5 mr-1" />
        <span className="hidden md:inline text-sm font-medium">
          {displayMode === "high-contrast" ? "High Contrast" : "Easy Read"}
        </span>
      </button>
      <LanguageSelector />
    </div>
  );
};

export default NavActions;
