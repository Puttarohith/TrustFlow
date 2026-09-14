import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

// Note: In a real Next.js App Router app, you'd use @supabase/ssr for server/client separation.
// Using standard supabase-js client here for API routes as per spec.
export const supabase = createClient(supabaseUrl, supabaseKey);
