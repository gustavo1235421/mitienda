import { supabase } from '../lib/supabase';
import { insertCloudProduct,markSynced,pendingProducts } from '../db/repositories/products';
type CloudProduct={client_id:string;name:string;quantity:number;price:number;updated_at:string};
export async function syncProducts(userId:string){
 const {data:{user},error:authError}=await supabase.auth.getUser();
 if(authError||user?.id!==userId)throw new Error('Sesión no válida. Inicia sesión nuevamente.');
 const {data,error}=await supabase.from('products').select('client_id,name,quantity,price,updated_at').eq('user_id',userId);
 if(error)throw error;
 let downloaded=0,uploaded=0;
 for(const item of (data||[]) as CloudProduct[])if(insertCloudProduct(userId,item))downloaded++;
 for(const p of pendingProducts(userId)){
 const {error:upError}=await supabase.from('products').upsert({user_id:userId,client_id:p.clientId,name:p.name,quantity:p.quantity,price:p.price,updated_at:p.updatedAt.toISOString()},{onConflict:'client_id'});
 if(upError)throw new Error(`${uploaded} subidos, ${downloaded} bajados. Error: ${upError.message}`);
 markSynced(userId,p);uploaded++;
 }
 return {uploaded,downloaded};
}
