// lib/supabaseClient.ts
import { createClient } from  '@supabase/supabase-js';

const supabaseUrl = 'https://usifuhyuyjnrcqcvgqwq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzaWZ1aHl1eWpucmNxY3ZncXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3NTE3OTksImV4cCI6MjA0MjMyNzc5OX0.H1QYGG6TOkhQa9FZK-4ljxSmsJKsWMOHm8JIi5CQF9c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


