import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default function HomeHeaderLeft() {
    const user = auth.currentUser;

    const navigation = useNavigation();
    function signOut() {
        auth.signOut().then(() => {
            navigation.dispatch(
                StackActions.replace('Login')
            )
        })
            .catch((error) => {
                Alert.alert("Error", error.message);
            })
    }

    return (
        <View className='ml-2'>
            <TouchableOpacity activeOpacity={0.5}>
                <Avatar rounded source={{
                    uri: user?.photoURL || undefined
                }} />
            </TouchableOpacity>
        </View>
    )
}