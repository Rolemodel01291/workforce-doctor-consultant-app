import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import { Input } from 'react-native-elements';

export const StyledInput = styled(Input).attrs((props) => ({
    inputContainerStyle: {
        width: wp(props.width),
        height: hp(props.height),
        borderWidth: props.borderWid,
        borderBottomWidth: props.borderBottomWid,
        borderColor: props.theme.main.colors.gray,
        borderRadius: props.borderRad,
        paddingHorizontal:wp(2)
    },
    inputStyle: { fontSize: 14},
    containerStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 0,
        paddingLeft: 0,
    },
    errorStyle: {
        color: props.theme.main.colors.red,
        borderColor: props.theme.main.colors.red,
    },
}))``;

export const DescriptionInput = styled.TextInput((props) => ({
    width: props.width ? wp(props.width) : wp(90),
    height: props.height ? hp(props.height) : hp(25),
    borderRadius:10,
    padding:wp(3),
    borderWidth:1,
    borderColor: props.theme.main.colors.gray
}));

export const StyledTextInput = styled(Input).attrs((props) => ({
    inputContainerStyle: {
        paddingHorizontal: 10,
        borderWidth: props.Rounded?1:0,
        borderColor: props.theme.main.colors.gray,
        borderRadius: props.Rounded?7:0,
        backgroundColor: props.InnerGray?props.theme.main.colors.lightGray:props.theme.main.colors.white  },
}))``;
