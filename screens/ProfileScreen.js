import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Text, View, SafeAreaView, TextInput, Keyboard, Platform, Animated } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import store from '../store';
import io from 'socket.io-client';
import scaleTransform from '../utils/scaleTransform';
import { animateImage, animateUpgradeButton, animateLevelIndicator, animateBgOpacity } from '../animations';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileTemplate from '../components/templates/ProfileTemplate.android';
import Button from '../components/atoms/Button/Button';
const profileImage = require('../assets/favicon.png');

const Container = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
`;
const Background = styled(Animatable.View)`
  background-color: rgba(255,0,0,0.3);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const StyledImage = styled(Animated.Image)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
const NameText = styled(Text)`
  font-size: 22px;
`;
const DescriptionText = styled(Text)`
  font-size: 14px;
  color: grey;
`;
const ButtonsWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 150px;
`;
const DescriptionInput = styled(TextInput)`
  flex: 1;
  height: 50px;
  background-color: #ccc;
  padding: 0 10px;
`;
const ImageWrapper = styled(View)``;
const LeverIndicator = styled(Animated.View)`
 background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
`;
const LevelIndicatorText = styled(Text)`
  color: white;
  font-size: 12px;
  text-align: center;
`;
const SetDescriptionWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  height: 50px;
`;
const Content = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

let socket;

const ProfileScreen = () => {
  const inputRef = useRef(null);
  const [currentDescription, setDescription] = useState('something');
  const [inputContent, setInputContent] = useState('');
  const [level, setLevel] = useState(1);

  /*
  const userID = store.getState().userID;
  console.log(111, userID);
  if (!userID) {
    return <Text>NIE JESTEŚ ZALOGOWANY!</Text>
  }*/ // to musi być w UseFocusEffect w class Component

  useEffect(() => {

    const socketConfig = io({
      reconnection: true,
    });
    socket = io.connect('http://io.rdnt.pl:5050');
    // socket.on('message', message => {
    //   console.log(111, message);
    // });
    console.log('connected!');

    AsyncStorage.getItem('DESCRIPTION')
      .then((value) => {
        if (value) setDescription(value);
      })
    AsyncStorage.getItem('LEVEL')
      .then((value) => setLevel(parseInt(value)))

  }, []);

  const handlePress = () => {
    inputRef.current.focus();
  }
  const changeDescription = () => {
    if (inputContent === '') return;

    setDescription(inputContent);
    setInputContent('');
    Keyboard.dismiss();

    AsyncStorage.setItem('DESCRIPTION', inputContent);
  }
  const handleInputChange = (text) => {
    setInputContent(text)
  }
  const levelUp = () => {

    socket.emit('upgrade', 'znowu sie rozladował')

    // console.log('emitted33333!')
    // setLevel(parseInt(level) + 1);
    // AsyncStorage.setItem('LEVEL', String(level + 1));
  }

  return (
    <Container>
      <Content>
        <ImageWrapper>
          <StyledImage
            source={profileImage}
          />
          <LeverIndicator>
            <LevelIndicatorText>{level}</LevelIndicatorText>
          </LeverIndicator>
        </ImageWrapper>

        <View>
          <NameText>Jan Nowak</NameText>
          <DescriptionText>{currentDescription}</DescriptionText>
        </View>

        <ButtonsWrapper>
          <Button onPress={handlePress}>Focus</Button>
          {/* <Animatable.View animation='shake' iterationCount='infinite'> */}
          <Button onPress={levelUp}>Upgrade</Button>
          {/* </Animatable.View> */}
        </ButtonsWrapper>
      </Content>

      <SetDescriptionWrapper>
        <DescriptionInput
          ref={inputRef}
          placeholder={'Type ...'}
          value={inputContent}
          onChangeText={handleInputChange}
          onSubmitEditing={() => changeDescription}
        />

        <Button onPress={changeDescription} set>SET</Button>

      </SetDescriptionWrapper>
    </Container>
  )
};

export default ProfileScreen;
