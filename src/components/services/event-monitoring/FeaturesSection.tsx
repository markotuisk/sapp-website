
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface FeaturesSectionProps {
  onContactClick: () => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onContactClick }) => {
  return (
    <div className="mt-12">
      <Card className="border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl text-sapp-dark">Why Choose Our Event Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
              <span className="text-sm text-sapp-gray">24/7 real-time monitoring capabilities</span>
            </li>
            <li className="flex items-start">
              <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
              <span className="text-sm text-sapp-gray">Advanced detection technologies</span>
            </li>
            <li className="flex items-start">
              <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
              <span className="text-sm text-sapp-gray">Experienced security professionals</span>
            </li>
            <li className="flex items-start">
              <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
              <span className="text-sm text-sapp-gray">Immediate incident response protocols</span>
            </li>
            <li className="flex items-start">
              <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
              <span className="text-sm text-sapp-gray">Customized monitoring solutions</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
            onClick={onContactClick}
          >
            Request Event Monitoring
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeaturesSection;
