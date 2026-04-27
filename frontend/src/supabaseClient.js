import { createClient } from '@supabase/supabase-js'

// මේ URL සහ Key එක ඔයාගේ Supabase Dashboard -> Settings -> API එකෙන් ලබාගන්න
const supabaseUrl = 'https://mgmvcbwjtsbmsuhjrgcx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbXZjYndqdHNibXN1aGpyZ2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTY2NjYsImV4cCI6MjA5Mjc5MjY2Nn0.l3sZB58ll8dczF2WrPyVAKSd3qYRnMZNUAhWN5XkLlQ'
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey)