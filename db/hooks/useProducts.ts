import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';
import { db } from '../client';
import { products } from '../schema';
export function useProducts(ownerId:string) {return useLiveQuery(db.select().from(products).where(eq(products.ownerId,ownerId)),[ownerId]);}
