import React from 'react';
import {Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(TouchableOpacity)`
    width: 45%;
    height: 80px;
    background: #9D4993;
    margin: 20px auto;
    align-items: center;
    justify-content: center;
`;
const TaskText = styled(Text)`
    color: white;
    font-size: 16px;
`;

const Task = ({ task, ...props }) => (
    <Wrapper {...props}>
        <TaskText>{task}</TaskText>
    </Wrapper>
);

export default Task;