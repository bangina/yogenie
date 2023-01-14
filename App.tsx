import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddLogScreen from "./src/screens/AddLog/AddLogScreen";
import HomeScreen from "./src/screens/Home/HomeScreen";
import LoginScreen from "./src/screens/Login/LoginScreen";

type RootStackParamList = {
  // Login: { userId: string };
  Home: undefined;
  Login: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeMainScreen} />
        <Stack.Screen options={{ headerShown: false }} name='AddLog' component={AddLogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// Home screen including main tab navigator
const HomeMainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-calendar" : "ios-calendar-sharp";
          } else if (route.name === "AddLog") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }} name='AddLog' component={AddLogScreen} />
    </Tab.Navigator>
  );
};
