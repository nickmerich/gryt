
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Link2, CheckCircle2, AlertCircle } from 'lucide-react';

interface CircleIntegrationStatusProps {
  integration: {
    id: string;
    name: string;
    lastSynced?: string;
    status: 'active' | 'error';
    dataPoints?: {
      label: string;
      value: string | number;
      progress?: number;
    }[];
  } | null;
  onDisconnect: () => void;
}

const CircleIntegrationStatus: React.FC<CircleIntegrationStatusProps> = ({
  integration,
  onDisconnect
}) => {
  if (!integration) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">External Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-sm text-center text-gray-500 mb-4">
              Connect an external tool to automatically track your progress
            </p>
            <Link to="/integrations">
              <Button className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Connect Integration
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">
            Connected to {integration.name}
          </CardTitle>
          {integration.status === 'active' ? (
            <CheckCircle2 className="text-green-500 h-4 w-4" />
          ) : (
            <AlertCircle className="text-orange-500 h-4 w-4" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {integration.status === 'error' ? (
          <div className="bg-orange-50 text-orange-700 p-3 rounded-md text-sm mb-3">
            Connection error. Please reconnect your integration.
          </div>
        ) : null}
        
        <div className="space-y-4 mb-4">
          {integration.dataPoints?.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span>{item.value}</span>
              </div>
              {item.progress !== undefined && (
                <Progress value={item.progress} className="h-1.5" />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          Last synced: {integration.lastSynced || 'Never'}
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onDisconnect}
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CircleIntegrationStatus;
