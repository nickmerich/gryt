
import { useState } from 'react';
import { Calendar, ExternalLink, Settings, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalendarIntegration } from '@/hooks/useCalendarIntegration';
import GhibliButton from '@/components/GhibliButton';

interface CalendarSettingsProps {
  goalId?: string;
}

const CalendarSettings = ({ goalId }: CalendarSettingsProps) => {
  const { integrations, isLoading, connectGoogle, disconnect, syncGoal, generateICalUrl } = useCalendarIntegration();
  const [iCalUrl, setICalUrl] = useState('');

  const handleConnectGoogle = async () => {
    await connectGoogle.mutateAsync();
  };

  const handleDisconnect = async (integrationId: string) => {
    await disconnect.mutateAsync(integrationId);
  };

  const handleSyncGoal = async (calendarId?: string) => {
    if (!goalId) return;
    await syncGoal.mutateAsync({ goalId, calendarId });
  };

  const copyICalUrl = () => {
    if (!goalId) return;
    const url = generateICalUrl(goalId);
    navigator.clipboard.writeText(url);
    setICalUrl(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Calendar Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Calendar Integration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Google Calendar</h3>
          {integrations?.some(i => i.provider === 'google') ? (
            <div className="space-y-3">
              {integrations
                .filter(i => i.provider === 'google')
                .map(integration => (
                  <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Connected
                      </Badge>
                      <span className="text-sm text-gray-600">Google Calendar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {goalId && (
                        <Button
                          size="sm"
                          onClick={() => handleSyncGoal(integration.calendar_id)}
                          disabled={syncGoal.isPending}
                        >
                          Sync Goal
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDisconnect(integration.id)}
                        disabled={disconnect.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Connect your Google Calendar to automatically sync your goals and milestones.
              </p>
              <GhibliButton
                onClick={handleConnectGoogle}
                disabled={connectGoogle.isPending}
                className="w-full sm:w-auto"
              >
                Connect Google Calendar
              </GhibliButton>
            </div>
          )}
        </div>

        {/* iCal Integration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">iCal Integration</h3>
          <p className="text-sm text-gray-600">
            Generate an iCal URL to subscribe to your goal events in any calendar app.
          </p>
          
          {goalId ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button onClick={copyICalUrl} variant="outline">
                  Generate iCal URL
                </Button>
              </div>
              
              {iCalUrl && (
                <div className="space-y-2">
                  <Label htmlFor="ical-url">iCal URL:</Label>
                  <div className="flex gap-2">
                    <Input
                      id="ical-url"
                      value={iCalUrl}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(iCalUrl)}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Copy this URL and add it as a calendar subscription in your preferred calendar app.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Select a specific goal to generate its iCal URL.
            </p>
          )}
        </div>

        {/* Calendar Sync Status */}
        {goalId && integrations && integrations.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sync Status</h3>
            <div className="p-3 border rounded-lg bg-blue-50">
              <p className="text-sm text-blue-700">
                Your goals will automatically sync to your connected calendars when you:
              </p>
              <ul className="mt-2 text-sm text-blue-600 list-disc list-inside">
                <li>Create new milestones</li>
                <li>Add todos with due dates</li>
                <li>Update goal progress</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarSettings;
