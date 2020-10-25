import React from 'react';
import { StatusBar } from 'react-native';
import TabNavigator from './Navigators/TabNavigator';
import StackNavigator from './Navigators/Login/StackNavigator';
import MainTemplate from './components/templates/MainTemplate';

const App = () => (
  <MainTemplate>
    <StatusBar
      backgroundColor='#F0F2F5'
      barStyle="dark-content"
    />
    <TabNavigator />
  </MainTemplate>

);

export default App;
