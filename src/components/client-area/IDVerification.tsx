
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, QrCode, ScanLine, Shield, Users, Clock, CheckCircle } from 'lucide-react';
import { QRScanner } from './QRScanner';
import { DigitalIDDialog } from './DigitalIDDialog';

interface IDVerificationProps {
  onBack: () => void;
}

interface VerificationRecord {
  id: string;
  name: string;
  employeeId: string;
  department?: string;
  timestamp: Date;
  isValid: boolean;
}

export const IDVerification: React.FC<IDVerificationProps> = ({ onBack }) => {
  const [showScanner, setShowScanner] = useState(false);
  const [showIDDialog, setShowIDDialog] = useState(false);
  const [verificationHistory, setVerificationHistory] = useState<VerificationRecord[]>([]);

  const handleScanResult = (data: any) => {
    const newRecord: VerificationRecord = {
      id: data.id,
      name: data.name,
      employeeId: data.employeeId,
      department: data.dept,
      timestamp: new Date(),
      isValid: data.verified && new Date(data.expires) > new Date(),
    };

    setVerificationHistory(prev => [newRecord, ...prev.slice(0, 9)]); // Keep last 10 records
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* ID Verification Header */}
        <Card className="border-2 border-sapp-blue/20 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sapp-blue">
              <Shield className="h-5 w-5" />
              Team ID Verification System
            </CardTitle>
            <CardDescription>
              Verify team member credentials and manage your digital ID
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => setShowIDDialog(true)}
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white h-16 flex-col gap-2"
              >
                <QrCode className="h-6 w-6" />
                Show My ID
              </Button>
              <Button
                onClick={() => setShowScanner(true)}
                variant="outline"
                className="border-sapp-blue text-sapp-blue hover:bg-sapp-blue/10 h-16 flex-col gap-2"
              >
                <ScanLine className="h-6 w-6" />
                Scan Team Member ID
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Verifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Verifications
            </CardTitle>
            <CardDescription>
              History of scanned team member IDs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {verificationHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No verifications yet</p>
                <p className="text-sm">Start scanning team member IDs to see history</p>
              </div>
            ) : (
              <div className="space-y-3">
                {verificationHistory.map((record, index) => (
                  <div
                    key={`${record.id}-${index}`}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      record.isValid 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {record.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Shield className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">{record.name}</p>
                        <p className="text-sm text-gray-600">{record.employeeId}</p>
                        {record.department && (
                          <p className="text-xs text-gray-500">{record.department}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {record.timestamp.toLocaleTimeString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {record.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-700">✓ Valid ID Indicators</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Green verification checkmark</li>
                  <li>• Current expiration date</li>
                  <li>• SAPP Security company verification</li>
                  <li>• Clear profile photo and details</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-red-700">⚠ Security Concerns</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Expired ID cards</li>
                  <li>• Non-SAPP Security IDs</li>
                  <li>• Damaged or unclear QR codes</li>
                  <li>• Report suspicious activity immediately</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scanner Modal */}
      {showScanner && (
        <QRScanner
          onClose={() => setShowScanner(false)}
          onScanResult={handleScanResult}
        />
      )}

      {/* Digital ID Dialog */}
      <DigitalIDDialog 
        open={showIDDialog} 
        onOpenChange={setShowIDDialog} 
      />
    </div>
  );
};
