import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomCheckBox } from '../layouts/components/Checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Checkbox = (props) => { 
    return props.type && props.type === 'radiobox' ? (
        <CustomCheckBox
            {...props}
            checkedIcon={<Icon name="radiobox-marked" color="#000" size={20} />}
            uncheckedIcon={
                <Icon name="radiobox-blank" color="#000" size={20} />
            }
            title={props.title}
            checked={props.checked}
            onPress={(ev) => props.onPress(ev)}
        />
    ) : (
        <CustomCheckBox
            {...props}
            checkedIcon={
                <Icon name="check-box-outline" color="#000" size={20} />
            }
            uncheckedIcon={
                <Icon name="checkbox-blank-outline" color="#000" size={20} />
            }
            title={props.title}
            checked={props.checked}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Checkbox;
