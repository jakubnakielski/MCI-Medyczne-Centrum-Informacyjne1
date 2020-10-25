import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme/mainTheme';
import { Provider } from 'react-redux';
import store from '../../store';
import { NavigationContainer } from '@react-navigation/native';

const MainTemplate = ({ children }) => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                {children}
            </NavigationContainer>
        </ThemeProvider>
    </Provider>

);

export default MainTemplate;