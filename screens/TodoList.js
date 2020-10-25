import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Keyboard, Animated, KeyboardAvoidingView, Image, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components';
import io from 'socket.io-client';
import store from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import scaleTransform from '../utils/scaleTransform';
import Message from '../components/atoms/Message/Message';
import Input from '../components/atoms/Input/Input';
import Heading from '../components/atoms/Heading/Heading';
const sendIconImage = require('../assets/sendIcon.png');
const arrowLeftImage = require('../assets/arrowLeft.png');
const avatarImage = require('../assets/avatar.png');

const StyledView = styled(View)`
    background-color: #F0F2F5;
`;
const Container = styled(KeyboardAvoidingView)`
        width: 100%;
        height: 84%;
        overflow: hidden;
        background: #fff;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
`;
const AnimatedAddTaskButton = Animated.createAnimatedComponent(TouchableOpacity);
const AddTaskButton = styled(AnimatedAddTaskButton)`
    background: #009688;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    elevation: 10;
`;
const AddTaskButtonText = styled(Text)`
    color: white;
`;
const MessageList = styled(Animated.FlatList)`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;
const InputWrapper = styled(View)`
    width: 90%;
    height: 60px;
    margin: 0 auto;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 20px;
`;
const StyledInput = styled(Input)`
    width: 100%;
`;
const StyledTouchableOpacity = styled(TouchableOpacity)`
    margin-left: -70px;
    width: 80px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Header = styled(View)`
    width: 100%;
    height: 16%;
    background: #F0F2F5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

let socket;
const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputContent, setInputContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const { navigate } = useNavigation();

    useEffect(() => {
        const socketConfig = io({
            reconnection: true,
        });
        socket = io.connect('http://io.rdnt.pl:5050');
    }, [])

    useFocusEffect(() => {
        const userID = store.getState().userID || null;
        console.log(userID);
        // socket.emit('chat', userID);
    });

    useEffect(() => {
        socket.on('chat', message => {
            console.log(111, message);
            setTasks([{ user: 'Andrzej', content: message }, ...tasks]);
        });

    }, [tasks]);

    const addTask = () => {
        Keyboard.dismiss();
        if (inputContent === '') return;

        setTasks([{ user: 'Ja', content: inputContent }, ...tasks]);
        setInputContent('');
        socket.emit('chat', inputContent);
    }

    return (
        <StyledView>
            <Header>
                <Image
                    source={arrowLeftImage}
                    style={{ width: 22, height: 22, opacity: 0.4 }}
                />
                <Heading>Antonia Berger</Heading>
                <Image
                    source={avatarImage}
                    style={{ width: 40, height: 40 }}
                />
            </Header>
            <Container behavior='padding'>
                <MessageList
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <Message
                                message={item}
                                key={index}
                                isMyMessage={item.user === "Ja" ? true : false}
                            />
                        )
                    }}
                    inverted
                    keyboardShouldPersistTaps={'always'}
                />

                <InputWrapper
                    as={LinearGradient}
                    colors={['#F5B346', '#FA7D8E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <StyledInput
                        placeholder='Napisz wiadomość...'
                        placeholderTextColor="#FFF"
                        value={inputContent}
                        onChangeText={setInputContent}
                        onSubmitEditing={(event) => addTask(event.nativeEvent.text)}
                    />
                    <StyledTouchableOpacity onPress={addTask}>
                        <Image
                            source={sendIconImage}
                            style={{ width: 20, height: 20 }}
                        />
                    </StyledTouchableOpacity>
                    {/* <AddTaskButton
                        activeOpacity={0.7}
                        delayPressIn={0}
                        style={scaleTransform(addTaskScale)}

                    >
                        <AddTaskButtonText>
                            Wyślij
                    </AddTaskButtonText>
                    </AddTaskButton> */}
                </InputWrapper>

            </Container>
        </StyledView>
    )
};

export default TodoList;

