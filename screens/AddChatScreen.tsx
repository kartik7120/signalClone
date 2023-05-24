import { View, Text, Alert } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Icon, Input } from '@rneui/themed'
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function AddChatScreen() {

    const [input, setInput] = useState("");
    const navigation = useNavigation();
    const createChat = async () => {
        try {
            const colRef = collection(db, "chats");
            await addDoc(colRef, {
                chatName: input
            })
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Error occured while creating chat");
        }
    }

    return (
        <View>
            <Input
                placeholder='Enter a chat name'
                value={input}
                onChangeText={(text) => setInput(() => text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name='wechat' type="antdesign" size={24} color="black" />
                }
            />
            <Button title="Create new Chat" onPress={createChat} />
            <StatusBar style="light" />
        </View>
    )
}