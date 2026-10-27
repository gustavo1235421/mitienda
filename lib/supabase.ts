import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { secureStorage } from './secureStorage';
const url=process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const key=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder';
export const configured=Boolean(process.env.EXPO_PUBLIC_SUPABASE_URL && process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
export const supabase=createClient(url,key,{auth:{storage:secureStorage,autoRefreshToken:true,persistSession:true,detectSessionInUrl:false}});
