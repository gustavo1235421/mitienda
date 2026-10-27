import * as SecureStore from 'expo-secure-store';
import type { SupportedStorage } from '@supabase/supabase-js';
export const secureStorage:SupportedStorage = {
 getItem:(key)=>SecureStore.getItemAsync(key),
 setItem:(key,value)=>SecureStore.setItemAsync(key,value),
 removeItem:(key)=>SecureStore.deleteItemAsync(key),
};
