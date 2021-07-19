import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import { Input, Button, CheckBox, Switch } from 'react-native-elements';

export const TextInputContainer = styled.View((props) => ({
    width: wp(props.width),
    height: hp(props.height),
    paddingLeft: wp(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: props.theme.main.colors.gray,
    borderWidth: 1,
}));

export const TextContainer = styled.View((props) => ({
    width: props.width ? wp(props.width) : '',
    height: props.height ? hp(props.height) : '',
    paddingLeft: wp(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 400,
    borderColor: props.theme.main.colors.gray,
    borderBottomWidth: props.borderBottomWidth ? props.borderBottomWidth : 0,
}));

export const TextLabel = styled.Text((props) => ({
    fontSize: 16,
    fontWeight: 400,
}));
