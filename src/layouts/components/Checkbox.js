import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import { CheckBox } from 'react-native-elements';

export const CustomCheckBox = styled(CheckBox).attrs((props) => ({
    containerStyle: {
        height: hp(5),
        borderWidth: 0,
        paddingTop: hp(1),
        paddingBottom: hp(1),
        paddingHorizontal: 0,
    },
    textStyle: {
        color: props.color
            ? props.color
            : props.theme.main.colors.fauxBlackOlive,
    },
}))``;
