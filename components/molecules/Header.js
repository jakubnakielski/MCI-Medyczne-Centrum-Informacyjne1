import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Heading from '../atoms/Heading';
const arrowLeftImage = require('../../assets/arrowLeft.png');
const avatarImage = require('../../assets/avatar.png');

const Wrapper = styled(View)`
    width: 100%;
    height: 16%;
    background: #F0F2F5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const Header = ({ children }) => {
    const { navigate } = useNavigation();

    return (
        <Wrapper>
            <Image
                source={arrowLeftImage}
                style={{ width: 22, height: 22, opacity: 0.4 }}
            />
            <Heading>{children}</Heading>
            <TouchableOpacity onPress={() => navigate('Login')}>
                <Image
                    source={avatarImage}
                    style={{ width: 40, height: 40 }}
                />
            </TouchableOpacity>

        </Wrapper>
    )
};

export default Header;