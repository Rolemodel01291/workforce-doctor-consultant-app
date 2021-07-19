import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomSwitch } from '../layouts/components/Switch';

const Switch = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <CustomSwitch
            {...props}
            onValueChange={toggleSwitch}
            value={isEnabled}
            // backgroundColor='red'
            height={30}
            circleSize={6}
            circleActiveColor={'#30a566'}
            // trackColor={{ false: '#767577', true: '#81b0ff' }}
            // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
    );
};

export default Switch;
