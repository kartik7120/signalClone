import { View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, Input } from '@rneui/themed';
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        navigation.navigate("Home" as never);
      }
    })
    return unsubscribe;
  }, [])

  function signIn() {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigation.navigate("Home" as never);
    })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 items-center justify-center p-10 bg-white'>
      <Image source={{
        uri: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Signal-Logo.svg"
      }} style={{
        width: 200,
        height: 200,
      }} />
      <StatusBar style="light" />
      <View className='w-[300]'>
        <Input autoFocus placeholder='Email' value={email} onChangeText={(text) => { setEmail(() => text) }} />
        <Input autoFocus secureTextEntry placeholder='Password' value={password} onChangeText={(password) => setPassword(password)} />
      </View>
      <Button containerStyle={{
        width: 200,
        marginTop: 10,
      }} title="Login" onPress={signIn} />
      <Button containerStyle={{
        width: 200,
        marginTop: 10,
      }} title="Register" type="outline" onPress={() => navigation.navigate("Register" as never)} />
    </KeyboardAvoidingView>
  )
}