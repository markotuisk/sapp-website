
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IdCard } from 'lucide-react';

interface DigitalIDSectionProps {
  onShowDigitalID: () => void;
}

export const DigitalIDSection: React.FC<DigitalIDSectionProps> = ({ onShowDigitalID }) => {
  return (
    <Card className="border-2 border-sapp-blue/20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sapp-blue">
          <IdCard className="h-5 w-5" />
          Digital Security ID
        </CardTitle>
        <CardDescription>
          Professional digital identification for team verification and site access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-sapp-dark">Ready to present your credentials?</h4>
            <p className="text-sm text-gray-600 mt-1">
              Show your professional ID to team members for quick verification
            </p>
          </div>
          <Button
            onClick={onShowDigitalID}
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white px-6"
          >
            <IdCard className="h-4 w-4 mr-2" />
            Show Digital ID
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
