import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from './lib/supabase';
import 'react-native-url-polyfill/auto'


const index = () => {
  const {session, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator />
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
       <Link href={'/sign-in'} asChild>
        <Button text="Sign in" />
      </Link>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={()=> supabase.auth.signOut()} text="Terminar Secção" />
    </View>
  );
};

export default index;