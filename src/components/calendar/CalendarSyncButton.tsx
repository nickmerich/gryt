
import { useState } from 'react';
import { Calendar, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useCalendarIntegration } from '@/hooks/useCalendarIntegration';

interface CalendarSyncButtonProps {
  goalId: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

const CalendarSyncButton = ({ goalId, size = 'sm', variant = 'outline' }: CalendarSyncButtonProps) => {
  const { integrations, syncGoal, generateICalUrl } = useCalendarIntegration();
  const [showSuccess, setShowSuccess] = useState(false);

  const hasConnectedCalendars = integrations && integrations.length > 0;

  const handleSync = async (calendarId?: string) => {
    await syncGoal.mutateAsync({ goalId, calendarId });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleICalCopy = () => {
    const url = generateICalUrl(goalId);
    navigator.clipboard.writeText(url);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={size} variant={variant} className="gap-2">
          <Calendar className="w-4 h-4" />
          {showSuccess ? <Check className="w-4 h-4 text-green-600" /> : 'Sync'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Calendar Sync</h4>
            <p className="text-sm text-gray-600">
              Sync this goal's milestones and todos to your calendar.
            </p>
          </div>

          {hasConnectedCalendars ? (
            <div className="space-y-3">
              <h5 className="text-sm font-medium">Connected Calendars</h5>
              {integrations?.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {integration.provider}
                    </Badge>
                    <span className="text-sm">Calendar</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSync(integration.calendar_id)}
                    disabled={syncGoal.isPending}
                  >
                    {syncGoal.isPending ? 'Syncing...' : 'Sync'}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-3">
                No calendars connected yet.
              </p>
              <Button size="sm" variant="outline" asChild>
                <a href="/settings?tab=calendar">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connect Calendar
                </a>
              </Button>
            </div>
          )}

          {/* iCal Option */}
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">iCal Subscribe</p>
                <p className="text-xs text-gray-500">Copy URL for calendar apps</p>
              </div>
              <Button size="sm" variant="ghost" onClick={handleICalCopy}>
                Copy URL
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CalendarSyncButton;
