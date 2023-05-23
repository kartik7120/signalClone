import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from "@rneui/themed";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function RegisterScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Login'
        })
    }, [navigation])

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                })
            })
            .catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                Alert.alert("Error", errorMessage);
            });
    }

    return (
        <KeyboardAvoidingView className='flex-1 items-center justify-center p-10 bg-white'
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text h3 className='mt-10'>
                Create a Signal account
            </Text>
            <View className='w-[300] mt-5'>
                <Input style={{ width: 300 }} placeholder='Full Name' autoFocus onChangeText={(text) => setName(() => text)} />
                <Input style={{ width: 300 }} placeholder='Email' onChangeText={(email) => setEmail(() => email)} />
                <Input style={{ width: 300 }} placeholder='Password' secureTextEntry onChangeText={(password) => setPassword(() => password)} />
                <Input style={{ width: 300 }} placeholder='Profile Picture URL (optional)'
                    onChangeText={(imageUrl) => setImageUrl(() => imageUrl)}
                    onSubmitEditing={register}
                />
            </View>
            <Button title="Register" raised onPress={register} containerStyle={{
                width: 200, marginTop: 10
            }} />
            <StatusBar style='light' />
        </KeyboardAvoidingView>
    )
}