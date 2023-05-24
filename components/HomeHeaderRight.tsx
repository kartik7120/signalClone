/// <reference types="nativewind/types" />
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeHeaderRight() {
    const navigation = useNavigation();
    return (
        <View className='mr-5 flex flex-row justify-between w-24'>
            <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name="camerao" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate("AddChat" as never);
            }} activeOpacity={0.5}>
                <SimpleLineIcons name="pencil" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}