import { View, Text } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStack } from '../App';
import { StatusBar } from 'expo-status-bar';
import { Avatar } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

type ProfileScreenRouteProp = RouteProp<RootStack, 'Chat'>;

export default function ChatScreen() {

  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();
  const [input, setInput] = useState("")
  const user = auth.currentUser;
  const [messages, setMessages] = useState<any[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar rounded source={{
            uri: messages.length > 0 ? messages[messages.length - 1].photoURL : 'https://picsum.photos/200/300',
          }} />
          <Text className='text-white ml-5 font-bold'>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity className='ml-5' onPress={() => {
          navigation.goBack();
        }}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, messages])

  useLayoutEffect(() => {
    const q = query(collection(db, "chats", route.params.id, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(() => snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    return unsubscribe;
  }, [route])

  const sendMessage = async () => {
    Keyboard.dismiss();
    if (user === null) {
      return;
    }
    try {
      const colRef = collection(db, "chats", route.params.id, "messages");
      await addDoc(colRef, {
        timestamp: serverTimestamp(),
        message: input,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL
      })
    } catch (error) {

    }
    setInput("");
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              {messages.map(({ id, data }) => (
                data.email === user?.email ? (
                  <View key={id} className='flex-row items-center justify-end'>
                    <View className='flex-row items-center justify-end bg-blue-500 rounded-full py-2 px-3 m-2'>
                      <Text className='text-white text-sm'>{data.message}</Text>
                      <Text className='text-white text-xs ml-2'>{new Date(data.timestamp?.toDate()).toLocaleString()}</Text>
                    </View>
                    <Avatar rounded source={{
                      uri: data.photoURL,
                    }} size={30} />
                  </View>
                ) : (
                  <View key={id} className='flex-row items-center'>
                    <Avatar rounded source={{
                      uri: data.photoURL,
                    }} size={30} />
                    <View className='flex-row items-center bg-gray-100 rounded-full py-2 px-3 m-2'>
                      <Text className='text-black text-sm'>{data.message}</Text>
                      <Text className='text-black text-xs ml-2'>{new Date(data.timestamp?.toDate()).toLocaleString()}</Text>
                    </View>
                  </View>
                )
              ))}
            </ScrollView>
            <View className='justify-between flex-row p-5 items-center'>
              <TextInput style={{
                bottom: 0,
                height: 40,
                flex: 1,
                marginRight: 15,
                borderWidth: 1,
                padding: 10,
                color: 'gray',
                borderRadius: 30,
                backgroundColor: '#ECECEC'
              }} value={input}
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(() => text)}
                placeholder='Signal Message' className='bg-gray-100 h-10 flex-grow px-5 rounded-full' />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}