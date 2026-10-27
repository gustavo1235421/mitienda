import React,{useState} from 'react';
import {ActivityIndicator,KeyboardAvoidingView,Platform,Text,TextInput,Pressable} from 'react-native';
import {Link} from 'expo-router';
import {supabase,configured} from '../lib/supabase';
import {ui} from '../lib/styles';
export default function LoginScreen(){
 const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [error,setError]=useState('');const [loading,setLoading]=useState(false);
 async function enter(){setError('');if(!configured)return setError('Primero configura las variables del archivo .env');if(!email.trim()||!password)return setError('Escribe tu correo y contraseña');setLoading(true);
 try{const response=await supabase.auth.signInWithPassword({email:email.trim().toLowerCase(),password});if(response.error)throw response.error;}catch(e){setError(e instanceof Error?e.message:'No fue posible iniciar sesión');}finally{setLoading(false)}
 }
 return <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={ui.center}>
 <Text style={{fontSize:43,marginBottom:12}}>🏪</Text><Text style={ui.logo}>BarrioStock</Text><Text style={ui.lead}>Tu tienda organizada, incluso sin señal.</Text>
 <Text style={ui.label}>Correo electrónico</Text><TextInput style={ui.field} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" placeholder="ejemplo@correo.com"/>
 <Text style={ui.label}>Contraseña</Text><TextInput style={ui.field} value={password} onChangeText={setPassword} secureTextEntry autoComplete="password" placeholder="Tu contraseña"/>
 {!!error&&<Text style={ui.error}>{error}</Text>}
 <Pressable disabled={loading} onPress={enter} style={ui.action}>{loading?<ActivityIndicator color="white"/>:<Text style={ui.actionText}>Entrar al inventario</Text>}</Pressable>
 <Link href="/registro" style={ui.link}>Crear una cuenta nueva</Link></KeyboardAvoidingView>
}
