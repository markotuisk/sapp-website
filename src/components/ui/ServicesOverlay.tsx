
import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface ServicesOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServicesOverlay = ({ open, onOpenChange }: ServicesOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md border-l border-gray-200 p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="text-lg font-semibold">Services</div>
            <Button 
              variant="ghost" 
              className="h-auto p-2 text-sm font-medium hover:bg-gray-100"
              onClick={() => onOpenChange(false)}
            >
              CLOSE
            </Button>
          </div>
          
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md pl-4 pr-10"
                placeholder="SAPP AI | Search Services, Media and Resources - feature under testing ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            {/* Service categories and links would go here */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Event Security</h3>
                <ul className="space-y-2">
                  <li><a href="/services/venue-security-audits" className="text-sapp-blue hover:underline">Venue Security Audits</a></li>
                  <li><a href="/services/event-monitoring" className="text-sapp-blue hover:underline">Event Monitoring</a></li>
                  <li><a href="/services/secure-technology" className="text-sapp-blue hover:underline">Secure Technology</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Security Audits</h3>
                <ul className="space-y-2">
                  <li><a href="/security-audits" className="text-sapp-blue hover:underline">Physical Security</a></li>
                  <li><a href="/cyber-security" className="text-sapp-blue hover:underline">Cyber Security</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Installations</h3>
                <ul className="space-y-2">
                  <li><a href="/installations/cctv-access" className="text-sapp-blue hover:underline">CCTV & Access Control</a></li>
                  <li><a href="/installations/speech-privacy" className="text-sapp-blue hover:underline">Speech Privacy</a></li>
                  <li><a href="/installations/counter-surveillance" className="text-sapp-blue hover:underline">Counter-Surveillance</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ServicesOverlay;
