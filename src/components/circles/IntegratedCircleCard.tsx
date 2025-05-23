
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Circle } from './CircleCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link2, CheckCircle } from 'lucide-react';
import { IntegrationProvider } from '@/services/integrationService';
import { toast } from 'sonner';

interface IntegratedCircleCardProps {
  circle: Circle;
  integrations: (IntegrationProvider & { connected?: boolean })[];
  onJoin: (circleId: string) => void;
}

const IntegratedCircleCard: React.FC<IntegratedCircleCardProps> = ({
  circle,
  integrations,
  onJoin
}) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string>('');
  const connectedIntegrations = integrations.filter(i => i.connected);
  
  const handleLinkIntegration = () => {
    // In a real implementation, this would save the integration link to the circle
    toast.success(`Linked ${selectedIntegration} to ${circle.name}`);
    setIsLinkDialogOpen(false);
    setSelectedIntegration('');
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden transition-all hover:shadow-md">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <Badge className="bg-blue-100 text-blue-800">{circle.category}</Badge>
            {circle.isJoined && (
              <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3" />
                Joined
              </Badge>
            )}
          </div>
          
          <h3 className="text-lg font-semibold mb-2">{circle.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{circle.description}</p>
          
          <div className="flex -space-x-2 mb-4">
            {circle.members.map((member) => (
              <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                {member.avatar ? (
                  <AvatarImage src={member.avatar} alt={member.name} />
                ) : (
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
            ))}
            {circle.memberCount > circle.members.length && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-800 text-xs border-2 border-white">
                +{circle.memberCount - circle.members.length}
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            {!circle.isJoined ? (
              <Button 
                className="w-full bg-gryt-blue hover:bg-gryt-blue/90"
                onClick={() => onJoin(circle.id)}
              >
                Join Circle
              </Button>
            ) : (
              <>
                <Link to={`/circles/${circle.id}`}>
                  <Button variant="outline" className="w-full">
                    View Circle
                  </Button>
                </Link>
                
                <Button 
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => setIsLinkDialogOpen(true)}
                >
                  <Link2 className="h-4 w-4" />
                  Link Integration
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link Integration to {circle.name}</DialogTitle>
            <DialogDescription>
              Connect an integration to automatically track your progress in this circle.
            </DialogDescription>
          </DialogHeader>
          
          {connectedIntegrations.length === 0 ? (
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-4">
                You don't have any integrations connected yet.
              </p>
              <Link to="/integrations">
                <Button className="w-full">Connect an Integration</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="py-4">
                <label className="block text-sm font-medium mb-2">Select Integration</label>
                <Select value={selectedIntegration} onValueChange={setSelectedIntegration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an integration" />
                  </SelectTrigger>
                  <SelectContent>
                    {connectedIntegrations.map(integration => (
                      <SelectItem key={integration.id} value={integration.id}>
                        {integration.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <p className="text-sm text-gray-500 mt-2">
                  This will automatically update your progress in this circle based on your activity.
                </p>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  disabled={!selectedIntegration} 
                  onClick={handleLinkIntegration}
                >
                  Link Integration
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IntegratedCircleCard;
