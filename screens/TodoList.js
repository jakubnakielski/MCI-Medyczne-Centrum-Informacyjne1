import React, { useState, useRef, useEffect } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Keyboard, FlatList, Animated, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';
import scaleTransform from '../utils/scaleTransform';
import Task from '../components/atoms/Task/Task';
import Input from '../components/atoms/Input/Input';

const Container = styled(SafeAreaView)`
        width: 100%;
        height: 100%;
        background: #fff;
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
const Header = styled(View)`
    background: #fff;
`;
const TasksList = styled(Animated.FlatList)`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const TodoList = () => {
    const [tasks, setTasks] = useState(['tset', 'eser', 'tset', 'eser', 'tset', 'eser', 'tset', 'eser', 'tset', 'eser', 'tset', 'eser']);
    const [inputContent, setInputContent] = useState('');
    const { navigate } = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('TASKS')
            .then((value) => {
                if (value) setTasks(JSON.parse(value));
            });
    }, []);
    useEffect(() => {
        AsyncStorage.setItem('TASKS', JSON.stringify([...tasks]));
    }, [tasks])

    const addTask = () => {
        Keyboard.dismiss();
        if (inputContent === '') return;

        setTasks([...tasks, inputContent]);
        setInputContent('');
        navigate('DetailsScreen', { info: 'new task added' });
    }
    const handleItemPress = (task) => {
        navigate('DetailsScreen', { info: task });
    }

    const scrollPosAnim = useRef(new Animated.Value(0));

    const addTaskScale = scrollPosAnim.current.interpolate({
        inputRange: [0, 400],
        outputRange: [1, 0],
        extrapolateRight: 'clamp',
        extrapolateLeft: 'extend',
    });

    return (
        <Container>
            <Header>
                <Input
                    placeholder='type new task ...'
                    value={inputContent}
                    onChangeText={setInputContent}
                    onSubmitEditing={addTask}
                />
                <AddTaskButton
                    activeOpacity={0.7}
                    delayPressIn={0}
                    style={scaleTransform(addTaskScale)}
                    onPress={addTask}
                >
                    <AddTaskButtonText>
                        Add task
                    </AddTaskButtonText>
                </AddTaskButton>
            </Header>
            <TasksList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Task task={item} key={index} onPress={() => handleItemPress(item)} />}
                numColumns={2}
                ListHeaderComponent={() => <Text>Header</Text>}
                ListFooterComponent={() => <Text>Footer</Text>}
                windowSize={10}
                onScroll={Animated.event([{
                    nativeEvent: { contentOffset: { y: scrollPosAnim.current } } //mapujemy 'y' na scrollPosAnim.current
                }], { useNativeDriver: true }
                )}
            // onScroll={(ev) => {
            //     const scrollPos = ev.nativeEvent.contentOffset.y;
            //     scrollPosAnim.current.setValue(scrollPos);
            // }}
            />
        </Container>
    )
};

export default TodoList;

