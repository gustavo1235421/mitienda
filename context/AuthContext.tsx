import React,{createContext,useContext,useEffect,useState} from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
type Auth={session:Session|null;loading:boolean;signOut:()=>Promise<void>};
const C=createContext<Auth>({session:null,loading:true,signOut:async()=>{}});
export function AuthProvider({children}:{children:React.ReactNode}){
 const [session,setSession]=useState<Session|null>(null);const [loading,setLoading]=useState(true);
 useEffect(()=>{supabase.auth.getSession().then(({data})=>{setSession(data.session);setLoading(false)}).catch(()=>setLoading(false));const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>setSession(s));return ()=>subscription.unsubscribe()},[]);
 return <C.Provider value={{session,loading,signOut:async()=>{const {error}=await supabase.auth.signOut();if(error)throw error;}}}>{children}</C.Provider>;
}
export const useAuth=()=>useContext(C);
