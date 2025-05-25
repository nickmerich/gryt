
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  goalId: string;
  milestoneId?: string;
  todoId?: string;
}

export interface CalendarIntegration {
  id: string;
  user_id: string;
  provider: 'google' | 'ical';
  calendar_id?: string;
  access_token?: string;
  refresh_token?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class CalendarService {
  async connectGoogleCalendar(): Promise<void> {
    try {
      // In a real implementation, this would initiate OAuth flow
      // For now, we'll simulate the connection
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('calendar_integrations')
        .upsert({
          user_id: userData.user.id,
          provider: 'google',
          is_active: true,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success('Google Calendar connected successfully!');
    } catch (error: any) {
      toast.error(`Failed to connect Google Calendar: ${error.message}`);
      throw error;
    }
  }

  async disconnectCalendar(integrationId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('calendar_integrations')
        .update({ is_active: false })
        .eq('id', integrationId);

      if (error) throw error;
      toast.success('Calendar disconnected successfully!');
    } catch (error: any) {
      toast.error(`Failed to disconnect calendar: ${error.message}`);
      throw error;
    }
  }

  async syncGoalToCalendar(goalId: string, calendarId?: string): Promise<void> {
    try {
      // Get goal details
      const { data: goal, error: goalError } = await supabase
        .from('goals')
        .select('*')
        .eq('id', goalId)
        .single();

      if (goalError) throw goalError;

      // Get milestones and todos for this goal
      const { data: milestones } = await supabase
        .from('milestones')
        .select(`
          *,
          todos (*)
        `)
        .eq('goal_id', goalId);

      // Create calendar events for milestones and todos
      const events: CalendarEvent[] = [];

      milestones?.forEach(milestone => {
        events.push({
          id: `milestone-${milestone.id}`,
          title: `${goal.title}: ${milestone.title}`,
          description: goal.description,
          start: new Date().toISOString(),
          end: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour duration
          goalId: goalId,
          milestoneId: milestone.id
        });

        milestone.todos?.forEach((todo: any) => {
          if (todo.due_date) {
            events.push({
              id: `todo-${todo.id}`,
              title: `${goal.title}: ${todo.title}`,
              description: `Milestone: ${milestone.title}`,
              start: new Date(todo.due_date).toISOString(),
              end: new Date(new Date(todo.due_date).getTime() + 30 * 60 * 1000).toISOString(), // 30 min duration
              goalId: goalId,
              milestoneId: milestone.id,
              todoId: todo.id
            });
          }
        });
      });

      // Store calendar sync data - convert events to JSON-compatible format
      const { error: syncError } = await supabase
        .from('calendar_syncs')
        .upsert({
          goal_id: goalId,
          calendar_id: calendarId,
          last_sync: new Date().toISOString(),
          sync_data: JSON.parse(JSON.stringify(events)) // Ensure proper JSON format
        });

      if (syncError) throw syncError;
      toast.success('Goal synced to calendar successfully!');
    } catch (error: any) {
      toast.error(`Failed to sync goal to calendar: ${error.message}`);
      throw error;
    }
  }

  async getCalendarIntegrations(): Promise<CalendarIntegration[]> {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return [];

      const { data, error } = await supabase
        .from('calendar_integrations')
        .select('*')
        .eq('user_id', userData.user.id)
        .eq('is_active', true);

      if (error) throw error;
      
      // Transform the data to match our interface
      return (data || []).map(integration => ({
        id: integration.id,
        user_id: integration.user_id,
        provider: integration.provider as 'google' | 'ical',
        calendar_id: integration.calendar_id || undefined,
        access_token: integration.access_token || undefined,
        refresh_token: integration.refresh_token || undefined,
        is_active: integration.is_active,
        created_at: integration.created_at,
        updated_at: integration.updated_at
      }));
    } catch (error) {
      console.error('Error fetching calendar integrations:', error);
      return [];
    }
  }

  generateICalUrl(goalId: string): string {
    // Generate a unique iCal URL for the goal
    return `${window.location.origin}/api/ical/${goalId}`;
  }
}

export const calendarService = new CalendarService();
