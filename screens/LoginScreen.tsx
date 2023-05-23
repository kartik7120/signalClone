import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, Input } from '@rneui/themed';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  function signIn() {

  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 items-center justify-center p-10 bg-white'>
      <Image source={{
        uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
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