import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components'
import ProfileScreen from '../screens/ProfileScreen';
import ChatStackNavigator from './Chat/StackNavigator';
import LoginStackNavigator from './Login/StackNavigator';
import chatIcon from '../assets/chatIcon.png';

const TabIcon = styled(Image)`

`;
//   width: 20px;
//   height: 20px;
//   background-color: ${({ focused }) => focused ? '#555' : '#bbb'};

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        tabBarOptions={{
            keyboardHidesTabBar: true
        }}
        initialRouteName='Login'
        screenOptions={({ route }) => ({
            tabBarLabel: () => <Text>{route.name}</Text>,
            tabBarIcon: ({ focused }) => { route.name === 'Chat' && <TabIcon source={chatIcon} style={{ width: 22, height: 22 }} focused={focused} /> }
        })}
    >
        <Tab.Screen name='Chat' component={ChatStackNavigator} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
        <Tab.Screen name='Login' component={LoginStackNavigator} />
    </Tab.Navigator >
);

export default TabNavigator;