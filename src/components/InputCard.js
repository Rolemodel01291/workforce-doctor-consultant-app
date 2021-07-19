import React from 'react';
import {
    FlexBetweenView,
    InputCardContainer,
    DarkGrayText,
    GreenText,
    GrayText,
    WhiteText,
    AvatarImage,
} from '../layouts/globalLayout';
import {
    TextGroup,
    ButtonGroup,
    DetailButton,
} from '../layouts/components/InputCard';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from './IconButton';
import { withNavigation } from '@react-navigation/compat';
import { theme } from '~/app-config/theme';
import { TouchableOpacity } from 'react-native';
import { Routes } from '../app-config/constants';

const Component = (props) => {
    const {
        navigation,
        image,
        title,
        text,
        time,
        checked,
        type,
        buttonImage,
        route,
    } = props;

    return (
        <InputCardContainer>
            {props.children ? (
                props.children
            ) : (
                <>
                    <FlexBetweenView>
                        <AvatarImage source={image} />
                        <TextGroup>
                            {title && (
                                <DarkGrayText fontSize="16">
                                    {title}
                                </DarkGrayText>
                            )}
                            {text && <GrayText>{text}</GrayText>}
                        </TextGroup>
                    </FlexBetweenView>
                    <ButtonGroup>
                        {time && <GreenText fontSize="13">{time}</GreenText>}
                        <TouchableOpacity
                            onPress={() =>
                                route ? navigation.navigate(route) : {}
                            }>
                            {type === 'ICON_BUTTON' && (
                                <IconButton width={5} source={buttonImage} />
                            )}
                            {type === 'TTEXT_BUTTON' && (
                                <DetailButton>
                                    <WhiteText fontSize="11">Detail</WhiteText>
                                </DetailButton>
                            )}
                        </TouchableOpacity>
                    </ButtonGroup>
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
                </>
            )}
        </InputCardContainer>
    );
};

export default withNavigation(Component);
