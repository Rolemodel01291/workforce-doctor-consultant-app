import React, { useEffect, useState } from 'react';
import { View, Button, Platform } from 'react-native';
import {
    TextInputContainer,
    TextContainer,
    TextLabel,
} from '../layouts/components/DatePicker';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DatePicker = (props) => {
    const [show, setShow] = useState(false);

    const onChange = (e, selectedDate) => {
        setShow(!show);
        props.onChange(selectedDate);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setShow(true)}>
                {props.type === 'textinput' ? (
                    <TextInputContainer
                        width={props.width}
                        height={props.height}>
                        <TextLabel>
                            {moment(props.value).format('YYYY-MM-DD')}
                        </TextLabel>
                    </TextInputContainer>
                ) : (
                    <TextContainer {...props}>
                        <TextLabel>
                            {moment(props.value).format('YYYY-MM-DD')}
                        </TextLabel>
                    </TextContainer>
                )}
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={props.value}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default DatePicker;
