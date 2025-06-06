
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Unlock, Search, AlertTriangle } from 'lucide-react';
import { useAccountUnlock } from '@/hooks/security/useAccountUnlock';

export const AccountUnlockCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [lockoutStatus, setLockoutStatus] = useState<any>(null);
  const { unlockUserAccount, getUserLockoutStatus, isUnlocking } = useAccountUnlock();

  const handleCheckStatus = async () => {
    if (!email) return;
    
    const status = await getUserLockoutStatus(email);
    setLockoutStatus(status);
  };

  const handleUnlock = async () => {
    if (!email) return;
    
    const result = await unlockUserAccount(email);
    if (result?.success) {
      // Refresh status after successful unlock
      await handleCheckStatus();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Account Unlock Utility
        </CardTitle>
        <CardDescription>
          Check account lockout status and unlock user accounts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="unlock-email">Email Address</Label>
          <div className="flex gap-2">
            <Input
              id="unlock-email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleCheckStatus}
              variant="outline"
              disabled={!email}
            >
              <Search className="h-4 w-4 mr-2" />
              Check Status
            </Button>
          </div>
        </div>

        {lockoutStatus && (
          <div className="space-y-3">
            {lockoutStatus.success === false ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{lockoutStatus.message}</AlertDescription>
              </Alert>
            ) : (
              <Alert className={lockoutStatus.is_locked ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <div><strong>Status:</strong> {lockoutStatus.is_locked ? 'LOCKED' : 'UNLOCKED'}</div>
                    <div><strong>Failed Attempts:</strong> {lockoutStatus.failed_attempts || 0}</div>
                    {lockoutStatus.remaining_attempts && (
                      <div><strong>Remaining Attempts:</strong> {lockoutStatus.remaining_attempts}</div>
                    )}
                    {lockoutStatus.remaining_minutes && (
                      <div><strong>Unlock In:</strong> {Math.ceil(lockoutStatus.remaining_minutes)} minutes</div>
                    )}
                    <div><strong>Message:</strong> {lockoutStatus.message}</div>
                    {lockoutStatus.is_admin && (
                      <div className="text-blue-600"><strong>Note:</strong> Admin users are exempt from lockouts</div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {lockoutStatus.is_locked && (
              <Button 
                onClick={handleUnlock}
                disabled={isUnlocking}
                className="w-full"
              >
                <Unlock className="h-4 w-4 mr-2" />
                {isUnlocking ? 'Unlocking...' : 'Unlock Account'}
              </Button>
            )}
          </div>
        )}

        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
          <strong>Security Notes:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Admin users are automatically exempt from account lockouts</li>
            <li>Lockout threshold increased to 15 failed attempts (was 5)</li>
            <li>Lockouts expire automatically after 30 minutes</li>
            <li>Manual unlock immediately clears all recent failed attempts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
