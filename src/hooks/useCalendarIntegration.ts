
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarService, CalendarIntegration } from '@/services/calendar/calendarService';

export const useCalendarIntegration = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { data: integrations, isLoading } = useQuery({
    queryKey: ['calendar-integrations'],
    queryFn: () => calendarService.getCalendarIntegrations(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const connectGoogle = useMutation({
    mutationFn: () => calendarService.connectGoogleCalendar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-integrations'] });
      setError(null);
    },
    onError: (error: any) => {
      setError(error.message);
    }
  });

  const disconnect = useMutation({
    mutationFn: (integrationId: string) => calendarService.disconnectCalendar(integrationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-integrations'] });
      setError(null);
    },
    onError: (error: any) => {
      setError(error.message);
    }
  });

  const syncGoal = useMutation({
    mutationFn: ({ goalId, calendarId }: { goalId: string, calendarId?: string }) => 
      calendarService.syncGoalToCalendar(goalId, calendarId),
    onSuccess: () => {
      setError(null);
    },
    onError: (error: any) => {
      setError(error.message);
    }
  });

  return {
    integrations,
    isLoading,
    error,
    connectGoogle,
    disconnect,
    syncGoal,
    generateICalUrl: calendarService.generateICalUrl
  };
};
