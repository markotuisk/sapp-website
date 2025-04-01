
import React from 'react';
import { X } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

interface LearnMoreModalProps {
  title: string;
  description: string;
  features: string[];
  isOpen: boolean;
  onClose: () => void;
  onContact: () => void;
}

const LearnMoreModal = ({
  title,
  description,
  features,
  isOpen,
  onClose,
  onContact
}: LearnMoreModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
      <div 
        className="w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-white rounded-xl overflow-hidden shadow-xl border-none">
          <CardHeader className="relative bg-sapp-blue text-white">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            <CardTitle className="text-xl font-display">{title}</CardTitle>
            <CardDescription className="text-white/80">{description}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                  <span className="text-sm text-sapp-gray">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-100 p-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="transition-all duration-300 hover:bg-slate-50"
            >
              Close
            </Button>
            <Button 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white transition-all duration-300"
              onClick={onContact}
            >
              Contact Us
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LearnMoreModal;
