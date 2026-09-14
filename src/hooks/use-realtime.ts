import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useRealtimeSubscription(
  table: string, 
  callback: (payload: any) => void,
  filter?: string
) {
  useEffect(() => {
    let channel = supabase
      .channel(`public:${table}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: table, filter: filter },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, callback, filter]);
}
