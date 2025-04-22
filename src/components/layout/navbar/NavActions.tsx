
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TranslatedText from "@/components/ui/TranslatedText";
import LanguageSelector from "../LanguageSelector";

const NavActions = () => {
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
      
      <LanguageSelector />
    </div>
  );
};

export default NavActions;
