/// <reference types="nativewind/types" />
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { auth } from './firebase';
import HomeHeaderLeft from './components/HomeHeaderLeft';
import HomeHeaderRight from './components/HomeHeaderRight';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

export type RootStack = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddChat: undefined;
  Chat: {
    id: string;
    chatName: string;
  };
}

const Stack = createStackNavigator<RootStack>();

export default function App() {
  const currentUser = auth.currentUser;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerStyle: {
          backgroundColor: "#2C6BED",
        },
        headerTitleStyle: {
          color: "white",
        },
        headerTintColor: "white",
      }}>
        <Stack.Screen name="Home" options={{
          title: "Signal",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            color: "#000",
          },
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerLeft: HomeHeaderLeft,
          headerRight: HomeHeaderRight
        }} component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} options={{
          title: "Add a new chat",
          headerBackTitle: "Chats",
        }} />
        <Stack.Screen name='Chat' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}