import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    HeaderBackgroundContainer,
    HeaderContainer,
    LeftHeaderContainer,
    HeaderText,
    RightText,
} from '../layouts/components/Header';
import { Routes } from '~/app-config/constants';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity } from 'react-native';

const Header = ({ navigation, title, subtitle, router, color }) => {
    return (
        <HeaderBackgroundContainer color={color}>
            <HeaderContainer>
                <LeftHeaderContainer>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" color="#FFF" size={20} />
                    </TouchableOpacity>
                    <HeaderText>{title}</HeaderText>
                </LeftHeaderContainer>
                <TouchableOpacity onPress={() => navigation.navigate(router)}>
                    <RightText>{subtitle}</RightText>
                </TouchableOpacity>
            </HeaderContainer>
        </HeaderBackgroundContainer>
    );
};

export default withNavigation(Header);
