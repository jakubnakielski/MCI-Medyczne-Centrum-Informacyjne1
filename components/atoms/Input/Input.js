import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components';

const StyledTextInput = styled(TextInput)`
    height: 50px;
    padding: 0 8px;
    color: #fff;
`;

const Input = (props) => (
    <StyledTextInput {...props} />
);


export default Input;