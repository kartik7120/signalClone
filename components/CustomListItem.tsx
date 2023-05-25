import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
    id: string;
    chatName: string;
}

export default function CustomListItem(props: Props) {
    const navigation = useNavigation();
    const [chatMessages, setChatMessages] = useState<any[]>([]);

    useEffect(() => {
        const q = query(collection(db, "chats", props.id, "messages"), orderBy("timestamp", "desc"), limit(1));
        const unsubscribe = onSnapshot(collection(db, "chats", props.id, "messages"), (snapshot: any) => {
            setChatMessages(snapshot.docs.map((doc: any) => doc.data()))
        })
        return unsubscribe;
    }, [props.id])

    const handlePress = () => {
        navigation.navigate("Chat" as never, {
            id: props.id,
            chatName: props.chatName
        } as never)
    }

    return (
        <ListItem onPress={handlePress} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: chatMessages.length > 0 ? chatMessages[0].photoURL
                        : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {props.chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages.length > 0 ? chatMessages[0].displayName + ": " + chatMessages[0].message : ""}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}