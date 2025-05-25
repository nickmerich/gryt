
import { Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRecoveryFlows } from '@/hooks/useRecoveryFlows';

const RecoveryFlowCard = () => {
  const { interventions, respondToRecovery } = useRecoveryFlows();

  const getInterventionIcon = (type: string) => {
    switch (type) {
      case 'difficulty_adjustment':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'reminder_increase':
        return <Shield className="w-4 h-4 text-blue-500" />;
      case 'break_suggestion':
        return <Shield className="w-4 h-4 text-green-500" />;
      case 'motivation_boost':
        return <Shield className="w-4 h-4 text-purple-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInterventionMessage = (intervention: any) => {
    switch (intervention.intervention_type) {
      case 'difficulty_adjustment':
        return 'Consider breaking this goal into smaller steps to maintain momentum.';
      case 'reminder_increase':
        return 'Would you like more frequent reminders to help you stay on track?';
      case 'break_suggestion':
        return 'It might be time for a short break to recharge and come back stronger.';
      case 'motivation_boost':
        return 'Remember why you started this goal. You\'ve got this! 💪';
      default:
        return 'We noticed you might need some support with this goal.';
    }
  };

  const handleResponse = (interventionId: string, accepted: boolean) => {
    respondToRecovery.mutate({
      id: interventionId,
      was_accepted: accepted
    });
  };

  if (!interventions || interventions.length === 0) {
    return (
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Recovery Support
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">You're doing great! No recovery support needed right now.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-500" />
          Recovery Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {interventions.map((intervention) => (
          <div key={intervention.id} className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
            <div className="flex items-start gap-3">
              {getInterventionIcon(intervention.intervention_type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {intervention.trigger_type.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  {getInterventionMessage(intervention)}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleResponse(intervention.id, true)}
                    disabled={respondToRecovery.isPending}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResponse(intervention.id, false)}
                    disabled={respondToRecovery.isPending}
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecoveryFlowCard;
