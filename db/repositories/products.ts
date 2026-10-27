import * as Crypto from 'expo-crypto';
import { and, eq, isNull, lt, or } from 'drizzle-orm';
import { db } from '../client';
import { products, Product } from '../schema';
export const listProducts = (ownerId:string) => db.select().from(products).where(eq(products.ownerId,ownerId)).all();
export const getProduct = (id:number,ownerId:string) => db.select().from(products).where(and(eq(products.id,id),eq(products.ownerId,ownerId))).get();
export const createProduct = (ownerId:string,name:string,quantity:number,price:number) => db.insert(products).values({clientId:Crypto.randomUUID(),ownerId,name,quantity,price,updatedAt:new Date(),syncedAt:null}).run();
export const updateProduct = (id:number,ownerId:string,name:string,quantity:number,price:number) => db.update(products).set({name,quantity,price,updatedAt:new Date(),syncedAt:null}).where(and(eq(products.id,id),eq(products.ownerId,ownerId))).run();
export const deleteProduct = (id:number,ownerId:string) => db.delete(products).where(and(eq(products.id,id),eq(products.ownerId,ownerId))).run();
export const pendingProducts = (ownerId:string) => db.select().from(products).where(and(eq(products.ownerId,ownerId),or(isNull(products.syncedAt),lt(products.syncedAt,products.updatedAt)))).all();
export const insertCloudProduct = (ownerId:string,p:{client_id:string;name:string;quantity:number;price:number;updated_at:string}) => {
 const exists=db.select().from(products).where(and(eq(products.ownerId,ownerId),eq(products.clientId,p.client_id))).get();
 if(exists) return false;
 const stamp=new Date(p.updated_at);
 db.insert(products).values({ownerId,clientId:p.client_id,name:p.name,quantity:p.quantity,price:p.price,updatedAt:stamp,syncedAt:stamp}).run();return true;
};
export const markSynced = (ownerId:string,p:Product) => db.update(products).set({syncedAt:p.updatedAt}).where(and(eq(products.ownerId,ownerId),eq(products.clientId,p.clientId),eq(products.updatedAt,p.updatedAt))).run();
