import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator
        headerMode='none'
        screenOptions={{
            animationEnabled: false,
        }}
    >
        <Stack.Screen
            name='Login'
            component={LoginScreen}
        />
        <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator >
);

export default StackNavigator;
