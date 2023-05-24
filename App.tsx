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

type RootStack = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddChat: undefined;
}

const Stack = createStackNavigator<RootStack>();

export default function App() {
  const currentUser = auth.currentUser;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
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
        {currentUser ? (
          null
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
        <Stack.Screen name="AddChat" component={AddChatScreen} options={{
          title: "Add a new chat",
          headerBackTitle: "Chats",
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}