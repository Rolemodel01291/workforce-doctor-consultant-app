import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import { Input, Button, CheckBox, Switch } from 'react-native-elements';

export const CustomSwitch = styled(Switch).attrs((props) => ({
    width: props.width
        ? wp(props.width)
        : 0,    
}))`
    color: ${(props) => props.theme.main.colors.white};
    border-color: ${(props) => props.theme.main.colors.white};
`;
