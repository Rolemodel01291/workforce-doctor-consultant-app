import React from 'react';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

const CustomLinearGradient = (props) => {
    return (
        <LinearGradient
            colors={['#efefef', '#fff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: props.borderRadius }}>
            {props.children}
        </LinearGradient>
    );
};

export default CustomLinearGradient;
