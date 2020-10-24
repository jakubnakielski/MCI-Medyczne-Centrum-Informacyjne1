import React, { useRef } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components';

const StyledView = styled(SafeAreaView)`
    width: 100%;
    height: 100%;
`;

const DynamicWebView = () => {
    const webViewRef = useRef(null);
    const code = `document.querySelector('p').style.fontSize = '50px'`;

    const makeBigger = () => {
        console.log(webViewRef.current.injectJavaScript(code));
    }

    return (
        <StyledView>
            <WebView
                source={{ html: '<h1>Header</h1><p>Paragraph</p>' }}
                startInLoadingState
                renderLoading={() => <Text>Loading ...</Text>}
                renderError={() => <Text>Something went wrong :/</Text>}
                onShouldStartLoadWithRequest={(request) => true}
                ref={webViewRef}
            />
            <Button
                title="Press me!"
                onPress={makeBigger}
            />
        </StyledView>
    )
};

export default DynamicWebView;