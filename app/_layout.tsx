import React from 'react';
import { ActivityIndicator,View } from 'react-native';
import { Stack } from 'expo-router';
import { AuthProvider,useAuth } from '../context/AuthContext';
import { sqlite } from '../db/client';
import migrations from '../drizzle/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from '../db/client';
function Navigation(){const {session,loading}=useAuth();const {success,error}=useMigrations(db,migrations);if(error)throw error;if(loading||!success)return <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator size="large"/></View>;
return <Stack screenOptions={{headerShown:false}}><Stack.Protected guard={!session}><Stack.Screen name="login"/><Stack.Screen name="registro"/></Stack.Protected><Stack.Protected guard={!!session}><Stack.Screen name="index"/><Stack.Screen name="producto"/></Stack.Protected></Stack>}
export default function Root(){return <AuthProvider><Navigation/></AuthProvider>}
