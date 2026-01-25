import { createClient } from '@supabase/supabase-js';

// Access environment variables safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);

export type DatabaseLogEntry = {
    id: number;
    created_at: string;
    subsystem_id: string; // 'mechanical', 'electrical', 'software'
    title: string;
    content: string;
    author: string;
    date: string; // Manually set date or derived from created_at
    images?: { src: string; caption?: string }[];
}
