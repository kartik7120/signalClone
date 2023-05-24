import { View, Text } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from '@rneui/themed';

interface Props {
    id: string;
    chatName: string;
    enterChat: any;
}

export default function CustomListItem() {
    return (
        <ListItem>
            <Avatar
                rounded
                source={{
                    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    Youtube Chat
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    This is a test subtitle
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}