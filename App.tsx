import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Characters from './app/screens/Characters';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Profile from './app/screens/Profile';
import CharacterDetails from './app/screens/CharacterDetails';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="MyTasks" component={List} options={{ title: 'My Tasks' }} />
      <InsideStack.Screen name="Profile" component={Profile} options={{ title: 'My Profile' }} />  
      <InsideStack.Screen name="Characters" component={Characters} options={{ title: 'View Characters' }} />
      <InsideStack.Screen name="CharacterDetails" component={CharacterDetails} options={{ title: 'View Character Details' }} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#cfcc44' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{
              title: 'Wingardium',
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Wingardium',
              headerShown: true,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  switchText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  underline: {
    color: '#cfcc44',
    textDecorationLine: 'underline',
  },
});
