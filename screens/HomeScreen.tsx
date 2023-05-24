import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { StatusBar } from 'expo-status-bar'

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}