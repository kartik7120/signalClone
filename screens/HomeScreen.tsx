import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { StatusBar } from 'expo-status-bar'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {

    const [chats, setChats] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        const colRef = collection(db, "chats");
        const unsubscribe = onSnapshot(colRef, (snapshot: any) => {
            setChats(snapshot.docs.map((doc: any) => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe;
    }, [])

    const enterChat = (id: string, chatName: string) => {
        navigation.navigate("Chat" as never, {
            id,
            chatName
        } as never)
    }

    const memoEnterChat = useCallback(enterChat, [])

    return (
        <>
            <ScrollView className='h-max'>
                {chats.map(({ id, data: { chatName } }: any) => (
                    <CustomListItem key={id} id={id} chatName={chatName} />
                ))}
            </ScrollView>
            <StatusBar style='dark' />
        </>
    )
}