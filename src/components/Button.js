import React from 'react';
import { theme } from '../app-config/theme';
import { CustomButton } from '../layouts/components/Button';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
    type,
    width,
    height,
    backgroundColor,
    color,
    marginHorizontal,
    marginVertical,
    borderRadius,
    borderColor,
    text,
    disabled,
    onPress
}) => {
    
    return (
        <CustomButton          
            type={type}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            color={color}
            marginHorizontal={marginHorizontal}
            marginVertical={marginVertical}
            borderRadius={borderRadius}
            borderColor={borderColor}
            title={text}
            disabled={disabled}
            onPress={onPress}
        />       
    );
};

export default Button;
