import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import TodoList from '../../screens/TodoList';
import DetailsScreen from '../../screens/DetailsScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator
        headerMode='none'
        screenOptions={{
            animationEnabled: false,
        }}
    >
        <Stack.Screen
            name='List'
            component={TodoList}
            options={{
                headerTitle: 'Main Page',
            }}
        />
        <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
    </Stack.Navigator >
);

export default StackNavigator;
