/// <reference types="nativewind/types" />
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

type RootStack = {
  Login: undefined;
  Register: undefined;
}

const Stack = createNativeStackNavigator<RootStack>();

export default function App() {
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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
