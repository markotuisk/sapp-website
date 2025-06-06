
import { Mail, Phone, MapPin, Linkedin, Twitter, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SAPPLogo } from '@/components/icons/CustomIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-sapp-dark text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <SAPPLogo />
              <span className="font-display font-bold text-xl">
                SAPP <span className="text-sapp-blue">Security</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Your trusted technical security and privacy partner providing comprehensive solutions for corporate organisations worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sapp-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sapp-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/event-security" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  Event Security
                </Link>
              </li>
              <li>
                <Link to="/security-audits" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  Security Audits
                </Link>
              </li>
              <li>
                <Link to="/installations" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  Technology Installations
                </Link>
              </li>
              <li>
                <Link to="/cyber-security" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  Cyber Security
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="/#about" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#partners" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-sapp-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  UK and Estonia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sapp-blue flex-shrink-0" />
                <a href="mailto:info@sappsecurity.com" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  info@sappsecurity.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sapp-blue flex-shrink-0" />
                <a href="tel:+442070888270" className="text-gray-400 hover:text-sapp-blue transition-colors text-sm">
                  +44 (0) 207 0888 270
                </a>
              </li>
            </ul>
            <a href="/#contact">
              <Button className="mt-6 bg-sapp-blue hover:bg-sapp-blue/90 text-white">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-500 text-sm">
            © | Security and Privacy Partners Ltd | {currentYear}
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center md:justify-end space-x-6 items-center">
              <li>
                <a href="#" className="text-gray-500 hover:text-sapp-blue transition-colors text-sm">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-sapp-blue transition-colors text-sm">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-sapp-blue transition-colors text-sm">
                  Cookies
                </a>
              </li>
              <li className="flex items-center">
                <Link to="/version-info" className="text-gray-500 hover:text-sapp-blue transition-colors text-sm flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Version
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
