import React from 'react';
import { TouchableOpacity } from 'react-native';
import { theme } from '../app-config/theme';
import { Container } from '../layouts/components/IconButton';
import { GrayText, IconImage } from '../layouts/globalLayout';

const IconButton = (props) => {
    return (
        <Container {...props}>
            <IconImage width={props.width} source={props.source} />
            {props.text && (
                <GrayText
                    fontSize={props.fontSize ? props.fontSize : ''}
                    fontWeight={props.fontWeight ? props.fontWeight : ''}
                    underline='underline'>
                    {props.text}
                </GrayText>
            )}
        </Container>
    );
};

export default IconButton;
