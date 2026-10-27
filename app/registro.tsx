import React,{useState} from 'react';
import {ActivityIndicator,ScrollView,Text,TextInput,Pressable} from 'react-native';
import {Link} from 'expo-router';import {supabase,configured} from '../lib/supabase';import {ui} from '../lib/styles';
export default function RegisterScreen(){
 const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [repeat,setRepeat]=useState('');const [message,setMessage]=useState('');const [saving,setSaving]=useState(false);
 async function register(){setMessage('');if(!/^\S+@\S+\.\S+$/.test(email.trim()))return setMessage('Introduce un correo válido.');if(password.length<6)return setMessage('Usa mínimo seis caracteres.');if(password!==repeat)return setMessage('Las contraseñas no coinciden.');if(!configured)return setMessage('Debes configurar Supabase en .env');setSaving(true);
 try{const {data,error}=await supabase.auth.signUp({email:email.trim().toLowerCase(),password});if(error)throw error;if(!data.session)setMessage('Cuenta creada. Desactiva la confirmación por correo en Supabase o confirma tu correo.');}catch(e){setMessage(e instanceof Error?e.message:'No se pudo crear la cuenta');}finally{setSaving(false)}
 }
 return <ScrollView contentContainerStyle={[ui.center,{flexGrow:1}]} keyboardShouldPersistTaps="handled"><Text style={ui.title}>Abre tu tienda ✨</Text><Text style={ui.lead}>Regístrate para respaldar tus productos en la nube.</Text>
 <Text style={ui.label}>Correo</Text><TextInput style={ui.field} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}/>
 <Text style={ui.label}>Contraseña</Text><TextInput style={ui.field} secureTextEntry value={password} onChangeText={setPassword}/>
 <Text style={ui.label}>Confirmar contraseña</Text><TextInput style={ui.field} secureTextEntry value={repeat} onChangeText={setRepeat}/>
 {!!message&&<Text style={ui.error}>{message}</Text>}
 <Pressable style={ui.action} disabled={saving} onPress={register}>{saving?<ActivityIndicator color="white"/>:<Text style={ui.actionText}>Crear mi cuenta</Text>}</Pressable><Link href="/login" style={ui.link}>Ya tengo cuenta · Ingresar</Link></ScrollView>
}
