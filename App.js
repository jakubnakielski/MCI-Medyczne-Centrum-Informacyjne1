import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './Navigators/TabNavigator';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <StatusBar
        backgroundColor='#fff'
        barStyle="dark-content"
      />
      <TabNavigator />
    </NavigationContainer >
  </Provider>
);

export default App;
