import React from 'react';
import {
    DarkGrayText,
    AvatarImage,
    GrayText,
    BlueText,
    RoundedImage,
} from '../layouts/globalLayout';
import {
    Card2Container,
    TextGroup,
    TimeContainer,
    TimeSection,
    RightContainer,
} from '../layouts/components/Card2';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from '@react-navigation/compat';
import { theme } from '~/app-config/theme';
import { TouchableOpacity, View, Text } from 'react-native';
import { Routes } from '../app-config/constants';

const Component = (props) => {
    const { image, name, time, number, checked } = props;

    return (
        <Card2Container>
            <RoundedImage source={image} />
            <RightContainer>
                <TextGroup>
                    <DarkGrayText fontSize="16">{name}</DarkGrayText>
                    <GrayText fontSize={12}>{number}</GrayText>
                </TextGroup>
                <TimeContainer>
                    <TimeSection>
                        <BlueText fontSize={12}>{time}</BlueText>
                    </TimeSection>
                </TimeContainer>
            </RightContainer>
            {checked ? (
                <Icon
                    style={{
                        position: 'absolute',
                        right: hp(-1),
                        top: hp(-1),
                    }}
                    color={theme.main.colors.green}
                    name="check-circle"
                    size={20}
                />
            ) : (
                <Icon
                    style={{
                        position: 'absolute',
                        right: hp(-1),
                        top: hp(-1),
                    }}
                    color={theme.main.colors.red}
                    name="check-circle"
                    size={20}
                />
            )}
        </Card2Container>
    );
};

export default withNavigation(Component);
