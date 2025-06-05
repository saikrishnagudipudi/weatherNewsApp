import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import TomorrowForecastScreen from './screens/TomorrowForecastScreen';
import WeeklyForecastScreen from './screens/WeeklyForecastScreen';
import { AppProvider } from './context/AppContext';

// Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator 
      
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any = 'home';
          if (route.name === 'Home') iconName = 'cloud-outline';
          else if (route.name === 'Settings') iconName = 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
      <Tab.Screen options={{headerShown:false}} name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="TomorrowForecastScreen" component={TomorrowForecastScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WeeklyForecastScreen" component={WeeklyForecastScreen} options={{ headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
