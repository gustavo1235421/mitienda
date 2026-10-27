import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
export const sqlite = openDatabaseSync('barriostock.db', { enableChangeListener: true });
export const db = drizzle(sqlite);
