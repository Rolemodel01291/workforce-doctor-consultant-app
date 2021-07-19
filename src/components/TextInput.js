import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { StyledInput } from '../layouts/components/TextInput';
import PropTypes from 'prop-types';
import { theme } from '../app-config/theme';

const InputComponent = (props) => {
    const [text, setText] = useState(props.text);

    return (
        <View style={styles.container}>
            <StyledInput                
                {...props}
            />
        </View>
    );
};

InputComponent.defaultProps = {
    width: 60,
    height: 4,   
    borderWid: 1,
    borderRad: 10,
    borderBottomWid: 1
};

InputComponent.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,   
    borderWid: PropTypes.number,  
    borderBottomWid: PropTypes.number,
    borderRad: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default InputComponent;
