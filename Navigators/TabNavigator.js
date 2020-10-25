import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components'
import ProfileScreen from '../screens/ProfileScreen';
import ListStackNavigator from './List/StackNavigator';
import LoginStackNavigator from './Login/StackNavigator';

const TabIcon = styled(View)`
  width: 20px;
  height: 20px;
  background-color: ${({ focused }) => focused ? '#555' : '#bbb'};
`;

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarLabel: () => <Text>{route.name}</Text>,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} /> //route.name === 'Profile'
        })}
    >
        <Tab.Screen name='List' component={ListStackNavigator} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
        <Tab.Screen name='Login' component={LoginStackNavigator} />
    </Tab.Navigator >
);

export default TabNavigator;