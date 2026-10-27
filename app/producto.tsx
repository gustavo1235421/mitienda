import React,{useEffect,useState} from 'react';import {Pressable,ScrollView,Text,TextInput} from 'react-native';
import {router,useLocalSearchParams} from 'expo-router';import {useAuth} from '../context/AuthContext';
import {createProduct,getProduct,updateProduct} from '../db/repositories/products';import {ui} from '../lib/styles';
export default function EditProductScreen(){
 const {id}=useLocalSearchParams<{id?:string}>();const {session}=useAuth();const owner=session?.user.id??'';
 const [name,setName]=useState('');const [units,setUnits]=useState('0');const [cost,setCost]=useState('0');const [error,setError]=useState('');
 useEffect(()=>{if(!id)return;const p=getProduct(Number(id),owner);if(!p){setError('No se encontró el producto');return}setName(p.name);setUnits(String(p.quantity));setCost(String(p.price));},[id,owner]);
 function submit(){setError('');if(!name.trim())return setError('Escribe el nombre del producto.');if(!/^\d+$/.test(units)||!/^\d+$/.test(cost))return setError('Cantidad y precio deben ser números enteros desde cero.');const quantity=Number(units),price=Number(cost);if(!Number.isSafeInteger(quantity)||!Number.isSafeInteger(price))return setError('Los valores son demasiado grandes.');try{if(id)updateProduct(Number(id),owner,name.trim(),quantity,price);else createProduct(owner,name.trim(),quantity,price);router.back()}catch(e){setError(e instanceof Error?e.message:'No fue posible guardar.')}}
 return <ScrollView contentContainerStyle={[ui.page,{flexGrow:1}]} keyboardShouldPersistTaps="handled"><Text style={ui.title}>{id?'Editar artículo':'Agregar artículo'}</Text><Text style={ui.lead}>Los cambios se guardan en el teléfono, sin necesidad de internet.</Text>
 <Text style={ui.label}>Nombre del producto *</Text><TextInput style={ui.field} placeholder="Ej. Café molido 250 g" value={name} onChangeText={setName}/>
 <Text style={ui.label}>Unidades disponibles *</Text><TextInput style={ui.field} keyboardType="number-pad" value={units} onChangeText={setUnits}/>
 <Text style={ui.label}>Precio unitario en pesos *</Text><TextInput style={ui.field} keyboardType="number-pad" value={cost} onChangeText={setCost}/>
 {!!error&&<Text accessibilityRole="alert" style={ui.error}>{error}</Text>}
 <Pressable style={ui.action} onPress={submit}><Text style={ui.actionText}>Guardar en el teléfono</Text></Pressable><Pressable style={ui.outline} onPress={()=>router.back()}><Text style={ui.outlineText}>Volver sin guardar</Text></Pressable></ScrollView>
}
