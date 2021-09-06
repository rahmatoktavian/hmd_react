import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabase_url = 'https://bgvhzdvymaizvumkyspq.supabase.co';
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjU5OTY3OSwiZXhwIjoxOTM4MTc1Njc5fQ.m2vt9dpEIyrzdDfNW6g-RZ0aCGfEhX_QQok1lR0ii5A';
const supabase = createClient(supabase_url, supabase_key, {
  localStorage: AsyncStorage,
});

export default supabase;