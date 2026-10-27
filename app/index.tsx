import React,{useMemo,useState} from 'react';
import {ActivityIndicator,Alert,FlatList,Pressable,Text,TextInput,View} from 'react-native';
import {router} from 'expo-router';import {useAuth} from '../context/AuthContext';import {useProducts} from '../db/hooks/useProducts';
import {deleteProduct} from '../db/repositories/products';import {syncProducts} from '../services/sync';import type {Product} from '../db/schema';import {palette,ui} from '../lib/styles';
const pesos=(amount:number)=>'$'+amount.toLocaleString('es-CO');
const isPending=(p:Product)=>!p.syncedAt||p.syncedAt.getTime()<p.updatedAt.getTime();
export default function InventoryScreen(){
 const {session,signOut}=useAuth();const owner=session?.user.id??'';const {data=[]}=useProducts(owner);
 const [query,setQuery]=useState('');const [status,setStatus]=useState('');const [working,setWorking]=useState(false);
 const summary=useMemo(()=>data.reduce((acc,p)=>({units:acc.units+p.quantity,value:acc.value+p.quantity*p.price,pending:acc.pending+(isPending(p)?1:0)}),{units:0,value:0,pending:0}),[data]);
 const visible=useMemo(()=>data.filter(p=>p.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())).sort((a,b)=>a.name.localeCompare(b.name)),[data,query]);
 async function synchronize(){setWorking(true);setStatus('Conectando con la nube…');try{const result=await syncProducts(owner);setStatus(`Sincronización completa: ${result.uploaded} subidos y ${result.downloaded} bajados.`);}catch(e){setStatus(`No se pudo sincronizar: ${e instanceof Error?e.message:'Comprueba tu conexión.'}`);}finally{setWorking(false)}}
 function confirmDelete(p:Product){Alert.alert('¿Quitar del inventario?',`Se eliminará «${p.name}» del teléfono.`,[{text:'Cancelar',style:'cancel'},{text:'Eliminar',style:'destructive',onPress:()=>{try{deleteProduct(p.id,owner)}catch(e){Alert.alert('Error',String(e))}}}])}
 return <View style={ui.page}>
 <View style={ui.row}><View><Text style={{fontSize:13,color:palette.muted}}>PANEL DE CONTROL</Text><Text style={ui.title}>🏪 BarrioStock</Text></View><Pressable onPress={()=>signOut().catch(e=>Alert.alert('Error',String(e)))}><Text style={{color:palette.red,fontWeight:'700'}}>Salir</Text></Pressable></View>
 <View style={[ui.panel,{backgroundColor:palette.ink}]}><Text style={{color:'#B8D7CA'}}>Valor del inventario</Text><Text style={{color:'white',fontSize:33,fontWeight:'900',marginVertical:9}}>{pesos(summary.value)}</Text><Text style={{color:'#DCECE5'}}>{data.length} productos · {summary.units} unidades</Text><Text style={{color:summary.pending?'#FFCB88':'#A7E7CB',marginTop:8}}>{summary.pending} pendientes de respaldo</Text></View>
 <View style={[ui.row,{gap:10,marginVertical:12}]}><Pressable disabled={working} style={[ui.action,{flex:1,marginTop:0}]} onPress={synchronize}>{working?<ActivityIndicator color="white"/>:<Text style={ui.actionText}>↻ Sincronizar</Text>}</Pressable><Pressable style={[ui.outline,{flex:1}]} onPress={()=>router.push('/producto')}><Text style={ui.outlineText}>＋ Nuevo</Text></Pressable></View>
 {!!status&&<Text accessibilityRole="alert" style={[ui.small,{marginBottom:8}]}>{status}</Text>}
 <TextInput placeholder="Buscar por nombre…" value={query} onChangeText={setQuery} style={[ui.field,{marginVertical:10}]} />
 <FlatList data={visible} keyExtractor={item=>item.clientId} contentContainerStyle={{paddingBottom:50}} ListEmptyComponent={<Text style={[ui.small,{textAlign:'center',marginTop:45}]}>No hay productos para mostrar.</Text>}
 renderItem={({item})=><Pressable style={ui.panel} onPress={()=>router.push({pathname:'/producto',params:{id:String(item.id)}})} onLongPress={()=>confirmDelete(item)}>
 <View style={ui.row}><Text style={{fontSize:17,fontWeight:'800',color:palette.ink,flex:1}}>{item.name}</Text><Text style={{fontSize:12,color:isPending(item)?palette.orange:palette.green}}>{isPending(item)?'● Pendiente':'✓ Respaldado'}</Text></View>
 <Text style={[ui.small,{marginTop:9}]}>{item.quantity} unidades × {pesos(item.price)}</Text><View style={[ui.row,{marginTop:10}]}><Text style={{fontWeight:'800',color:palette.ink}}>{pesos(item.quantity*item.price)}</Text><Pressable onPress={()=>confirmDelete(item)}><Text style={{color:palette.red}}>Eliminar</Text></Pressable></View>
 </Pressable>}/>
 </View>
}
